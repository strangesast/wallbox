import os
import asyncio
from aiohttp import web
from contextvars import ContextVar

MPD_HOST = os.environ.get('MPD_HOST') or 'localhost'
MPD_PORT = os.environ.get('MPD_PORT') or '6600'

queue_var = ContextVar('queue')


async def worker():
    reader, writer = await asyncio.open_connection(MPD_HOST, MPD_PORT)
    queue = queue_var.get()

    data = await reader.read(1000000)
    #data = await reader.readuntil(b'OK\n')

    while True:
        # Get a "work item" out of the queue.
        command, fut = await queue.get()
        print(f'sending "{command}"')
        writer.write(command.encode())
        data = await reader.read(1000000)
        #data = await reader.readuntil(b'OK\n')
        fut.set_result(data)
        queue.task_done()


async def get_status(request):
    #name = request.match_info.get('name', "Anonymous")
    queue = queue_var.get()
    fut = asyncio.get_running_loop().create_future()
    command = 'status\n'
    queue.put_nowait((command, fut))

    print('waiting...')
    response = await fut

    response = response.decode()

    response = response.split('\n')
    if response[-1] != '' or response[-2] != 'OK':
        raise ValueError('unexpected response!')

    response = {a: b.strip() for p in response[0:-2] for (a, b) in [p.split(':', 1)]}
    return web.json_response(response)


async def handle(request):
    print('got request')
    name = request.match_info.get('name', "Anonymous")
    return web.Response(text=name)


app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/status', get_status),
                web.get('/{name}', handle)])


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

    # pause here for very long time by serving HTTP requests and
    # waiting for keyboard interruption
    await asyncio.sleep(100*3600)


asyncio.run(main())
