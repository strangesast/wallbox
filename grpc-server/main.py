import re
import asyncio
import time
from datetime import datetime
from grpclib.utils import graceful_exit
from grpclib.server import Server, Stream
from google.protobuf.timestamp_pb2 import Timestamp
from mpd.asyncio import MPDClient

from wallbox_grpc import WallboxApiBase
import wallbox_pb2 as pb


keyvalue_re = re.compile('^([\S]+):\s([\S\s]+)$')

def timestamp_from_str(s: str):
  return Timestamp().FromDatetime(datetime.strptime(s, '%Y-%m-%dT%H:%M:%SZ'))


class WallboxApi(WallboxApiBase):
    def __init__(self, queue, client):
        self.queue = queue
        self.client = client

    async def execute(self, command):
        fut = asyncio.get_running_loop().create_future()
        await self.queue.put((command, fut));
        result = await fut
        return result

    async def Toggle(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.pause();
        await stream.send_message(pb.Empty())

    async def Play(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.play(0);
        await stream.send_message(pb.Empty())

    async def Pause(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.pause(1);
        await stream.send_message(pb.Empty())

    async def Next(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.next();
        await stream.send_message(pb.Empty())

    async def Previous(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.previous();
        await stream.send_message(pb.Empty())

    async def Stop(self, stream: Stream[pb.Empty, pb.Empty]):
        await self.client.stop();
        await stream.send_message(pb.Empty())

    async def QueueAdd(self, stream: Stream[pb.Uri, pb.Empty]):
        # do stuff
        request = await stream.recv_message()
        await self.client.add(request.uri)
        await stream.send_message(pb.Empty())

    async def QueueGetAll(self, stream: Stream[pb.Empty, pb.PlaylistResult]):
        records = []
        async for record in self.client.playlistinfo():
            #{
            # 'file': 'Kendrick Lamar – The Recipe (Feat. Dr. Dre)  (2012) - [Single MP3.mp3',
            # 'last-modified': '2015-04-18T05:50:25Z',
            # 'artist': 'Kendrick Lamar feat. Dr. Dre',
            # 'title': 'The Recipe',
            # 'time': '344',
            # 'duration': '344.189',
            # 'pos': '0',
            # 'id': '1'
            # }
            record['uri'] = record.pop('file')
            record['time'] = int(record.pop('time'))
            record['duration'] = float(record.pop('duration'))
            record['date'] = str(record.pop('date', ''))
            record['lastModified'] = timestamp_from_str(record.pop('last-modified', None))
            record['pos'] = int(record.pop('pos'))
            record['id'] = int(record.pop('id'))
            records.append(pb.PlaylistResult.PlaylistItem(**record))
        await stream.send_message(pb.PlaylistResult(items=records, count=len(records)))

    async def Status(self, stream: Stream[pb.Empty, pb.StatusResult]):
        await stream.recv_message()
        status = await self.client.status()
        status['volume'] = int(status.pop('volume'))
        status['repeat'] = int(status.pop('repeat'))
        status['random'] = int(status.pop('random'))
        status['consume'] = int(status.pop('consume'))
        status['single'] = int(status.pop('single'))
        status['song'] = int(status.pop('song'))
        status['songid'] = int(status.pop('songid'))
        status['nextsong'] = int(status.pop('nextsong'))
        status['nextsongid'] = int(status.pop('nextsongid'))
        status['playlist'] = int(status.pop('playlist'))
        status['playlistlength'] = int(status.pop('playlistlength'))
        status['mixrampdb'] = float(status.pop('mixrampdb'))
        status['elapsed'] = float(status.pop('elapsed'))
        status['bitrate'] = int(status.pop('bitrate'))
        status['duration'] = float(status.pop('duration'))
        await stream.send_message(pb.StatusResult(**status))

    async def Search(self, stream: Stream[pb.SearchParameters, pb.SearchResultItem]):
        request: pb.SearchParameters = await stream.recv_message()

        count = 0
        start = time.time()
        async for record in self.client.search("any", request.query):
            count+=1;
            record['uri'] = record.pop('file')
            record['time'] = int(record.pop('time'))
            record['duration'] = float(record.pop('duration'))
            record['type'] = 'file'
            record['date'] = str(record.pop('date', ''))
            record['lastModified'] = timestamp_from_str(record.pop('last-modified', None))
            await stream.send_message(pb.SearchResultItem(**record))
        #await stream.send_message(pb.SearchResultItem(), end=True)
        #total_time = time.time() - start
        #await stream.send_trailing_metadata(metadata={'count': f'{count}', 'time': f'{total_time}'})
        #await stream.end()

    async def GetFilesAtURI(self, stream):
        request: Uri = await stream.recv_message()
        uri = request.uri
        command = f'listfiles \"{uri}\"\n'
        lines = await self.execute(command)

        items = []
        last = None
        for line in lines:
            if (match := keyvalue_re.match(line)):
                key, value = match.groups()
                if key == 'file' or key == 'directory':
                    last = {}
                    last['type'] = key
                    items.append(last)
                    key = 'uri'
                last[key] = value
        items = [pb.FileListResult.FileListItem(uri=(f'{uri}/' if uri != '' else '') + item['uri'], name=item['uri'], type=item['type']) for item in items]
        await stream.send_message(pb.FileListResult(items=items, count=len(items)))


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
    client = MPDClient()

    await client.connect('localhost', 6600)

    #print(f'mpd version: {client.mpd_version}')

    #status = await client.status()
    #print(f'{status=}')

    #print(list(await client.commands()))

    #client.disconnect()

    #await asyncio.sleep(1000)

    queue = asyncio.Queue()
    server = Server([WallboxApi(queue, client)])

    task = asyncio.create_task(worker(queue))

    with graceful_exit([server]):
        await server.start(host, port)
        await server.wait_closed()

    task.cancel()

if __name__ == '__main__':
    asyncio.run(main())
