import asyncio
from grpclib.utils import graceful_exit
from grpclib.server import Server

from wallbox_grpc import WallboxApiBase
from wallbox_pb2 import SearchParameters, FileListResult, Uri


class WallboxApi(WallboxApiBase):
    async def Search(self, stream):
        request: SearchParameters = await stream.recv_message()
        print(request)
        items = []
        await stream.send_message(SearchResultItemList(items=items, length=len(items)))

    async def GetFilesAtURI(self, stream):
        request: Uri = await stream.recv_message()
        print(request)
        items = []
        await stream.send_message(FileListResult(items=items, length=len(items)))

async def main(*, host='127.0.0.1', port=50051):
    server = Server([WallboxApi()])
    with graceful_exit([server]):
        await server.start(host, port)
        await server.wait_closed()

if __name__ == '__main__':
    asyncio.run(main())
