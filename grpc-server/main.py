import re
import asyncio
from grpclib.utils import graceful_exit
from grpclib.server import Server

from wallbox_grpc import WallboxApiBase
import wallbox_pb2 as pb


class WallboxApi(WallboxApiBase):
    def __init__(self, queue):
        self.queue = queue

    async def Search(self, stream):
        request: pb.SearchParameters = await stream.recv_message()
        fut = asyncio.get_running_loop().create_future()
        command = f'search \"(Title contains \\\"{request.query}\\\")\"\n'
        await self.queue.put((command, fut));
        lines = await fut
        r = re.compile('^([\S]+):\s([\S\s]+)$')

        items = []
        last = None
        for line in lines:
            if (match := r.match(line)):
                key, value = match.groups()
                if key == 'file':
                    last = {}
                    items.append(last)
                last[key] = value

        items = [pb.SearchResultItemList.SearchResultItem(uri=item['file'],name=item['Title']) for item in items]
        response = pb.SearchResultItemList(items=items, count=len(items))
        await stream.send_message(response)

    async def GetFilesAtURI(self, stream):
        request: Uri = await stream.recv_message()
        print(request)
        items = []
        await stream.send_message(pb.FileListResult(items=items, length=len(items)))


async def worker(queue):
    print('worker started')
    while True:
        command, fut = await queue.get()
        reader, writer = await asyncio.open_connection('localhost', 6600)
        greeting = await reader.readline()

        writer.write(command.encode())
        await writer.drain()
        response = []

        while True:
            b = await reader.readline()
            line = b.decode().strip()
            response.append(line)
            if line == 'OK' or line.startswith('OK') or line.startswith('ACK') or not line:
                break
        fut.set_result(response)
        queue.task_done()

        writer.close()
        await writer.wait_closed()


async def main(*, host='127.0.0.1', port=50051):
    queue = asyncio.Queue()
    server = Server([WallboxApi(queue)])

    task = asyncio.create_task(worker(queue))

    with graceful_exit([server]):
        await server.start(host, port)
        await server.wait_closed()

    task.cancel()

if __name__ == '__main__':
    asyncio.run(main())
