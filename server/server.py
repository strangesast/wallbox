import os
import asyncio
from aiohttp import web
from contextvars import ContextVar
from datetime import datetime
import re

MPD_HOST = os.environ.get('MPD_HOST') or 'localhost'
MPD_PORT = os.environ.get('MPD_PORT') or '6600'

queue_var = ContextVar('queue')

version_re = re.compile('OK MPD (?P<version>[\d.]+)')
#file_re = re.compile('(file:\s(?P<filename>[\w\S ]+)$\nsize:\s(?P<filesize>[\d]+)$\nLast-Modified:\s(?P<filemodified>[\w\S]+)$\n)|(directory:\s(?P<directoryname>[\w\S ]+)$\nLast-Modified:\s(?P<foldermodified>[\w -:.]+)$\n)', re.M)
file_re = re.compile('(?P<name>(directory|file): ([\w\S ]+)$\n)(?P<size>size: ([\d]+)$\n)?(?P<lastmodified>Last-Modified: ([\w\S ]+)$\n)', re.M)

async def worker():
    reader, writer = await asyncio.open_connection(MPD_HOST, MPD_PORT)
    queue = queue_var.get()

    data = await reader.read(1000000)
    version = version_re.search(data.decode()).group(1)
    print(f'mpd version: {version}')

    while True:
        command, fut = await queue.get()
        writer.write(command.encode())
        data = await reader.read(1000000)
        fut.set_result(data)
        queue.task_done()

async def do_command(command: str) -> str:
    if not command.endswith('\n'):
        raise Exception('invalid command (does not end with newline)')
    queue = queue_var.get()
    fut = asyncio.get_running_loop().create_future()
    queue.put_nowait((command, fut))
    response = await fut
    return response.decode()


async def get_status(request):
    #name = request.match_info.get('name', "Anonymous")
    response = await do_command('status\n')

    response = response.split('\n')
    if response[-1] != '' or response[-2] != 'OK':
        raise ValueError('unexpected response!')

    response = {a: b.strip() for p in response[0:-2] for (a, b) in [p.split(':', 1)]}
    return web.json_response(response)


def parse_dir(txt):
    for each in file_re.finditer(txt):
        kind = each.group(2)
        name = each.group(3)
        modified = datetime.strptime(each.group(7), '%Y-%m-%dT%H:%M:%SZ') if each.group(6) is not None else None
        if kind == 'file':
            size = int(each.group(5)) if each.group(4) is not None else None
            yield {"type": kind, "name": name, "size": size, "last-modified": modified.isoformat()}
        else:
            yield {"type": kind, "name": name, "last-modified": modified.isoformat()}


async def get_directory(request):
    tail = request.match_info.get('tail', '')
    response = await do_command(f'listfiles "{tail}"\n')
    response = list(parse_dir(response))

    return web.json_response(response)


async def handle(request):
    print('got request')
    name = request.match_info.get('name', "Anonymous")
    return web.Response(text=name)


app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/status', get_status),
                web.get('/list', get_directory),
                web.get('/list/{tail:.*}', get_directory),
                #web.get('/{name}', handle),
                ])


async def main():
    queue = asyncio.Queue()
    queue_var.set(queue)

    runner = web.AppRunner(app)
    await runner.setup()

    site = web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()
    
    print("======= Serving on http://127.0.0.1:8080/ ======")

    loop = asyncio.get_running_loop()
    await loop.create_task(worker())
    #await asyncio.sleep(100*3600)


asyncio.run(main())
