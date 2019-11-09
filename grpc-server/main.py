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


def parse_status(status):
    status['volume'] = int(status.pop('volume', '0'))
    status['repeat'] = int(status.pop('repeat', '0'))
    status['random'] = int(status.pop('random', '0'))
    status['consume'] = int(status.pop('consume', '0'))
    status['single'] = int(status.pop('single', '0'))
    status['song'] = int(status.pop('song', '0'))
    status['songid'] = int(status.pop('songid', '0'))
    status['nextsong'] = int(status.pop('nextsong', '0'))
    status['nextsongid'] = int(status.pop('nextsongid', '0'))
    status['playlist'] = int(status.pop('playlist', '0'))
    status['playlistlength'] = int(status.pop('playlistlength', '0'))
    status['mixrampdb'] = float(status.pop('mixrampdb', '0'))
    status['elapsed'] = float(status.pop('elapsed', '0'))
    status['bitrate'] = int(status.pop('bitrate', '0'))
    status['duration'] = float(status.pop('duration', '0'))


async def check_state(newstate):
    pass


clients = []

class WallboxApi(WallboxApiBase):
    def __init__(self, commands_queue, queue, client):
        self.commands_queue = commands_queue
        self.queue = queue
        self.client = client

    async def execute(self, command):
        fut = asyncio.get_running_loop().create_future()
        await self.queue.put((command, fut));
        result = await fut
        return result

    async def State(self, stream: Stream[pb.PlayState, pb.StatusResult]):
        print('new state connection')
        await stream.recv_message() # empty
        clients.append(stream)
        await asyncio.sleep(10*60) # ten minutes

    async def Toggle(self, stream: Stream[pb.Empty, pb.Empty]):
        fut = asyncio.get_event_loop().create_future()
        command = self.client.pause();
        await self.commands_queue.put((command, fut))
        await fut
        await stream.send_message(pb.Empty())

    async def Play(self, stream: Stream[pb.Empty, pb.Empty]):
        request = await stream.recv_message()

        fut = asyncio.get_event_loop().create_future()
        if request.HasField('id'):
            command = self.client.playid(request.id)
            await self.commands_queue.put((command, fut))
        else:
            command = self.client.play(request.pos)
            await self.commands_queue.put((command, fut))

        response = await fut # could send this
        await stream.send_message(pb.Empty())


    async def Pause(self, stream: Stream[pb.Empty, pb.Empty]):
        command = self.client.pause(1);
        fut = asyncio.get_running_loop().create_future()
        await self.commands_queue.put((command, fut))
        await fut

        await stream.send_message(pb.Empty())

    async def Next(self, stream: Stream[pb.Empty, pb.Empty]):
        command = self.client.next()
        fut = asyncio.get_running_loop().create_future()
        await self.commands_queue.put((command, fut))
        await fut
        await stream.send_message(pb.Empty())

    async def Previous(self, stream: Stream[pb.Empty, pb.Empty]):
        command = self.client.previous()
        fut = asyncio.get_running_loop().create_future()
        await self.commands_queue.put((command, fut))
        await fut
        await stream.send_message(pb.Empty())

    async def Stop(self, stream: Stream[pb.Empty, pb.Empty]):
        command = self.client.stop()
        fut = asyncio.get_running_loop().create_future()
        await self.commands_queue.put((command, fut))
        await fut
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
        status['volume'] = int(status.pop('volume', '0'))
        status['repeat'] = int(status.pop('repeat', '0'))
        status['random'] = int(status.pop('random', '0'))
        status['consume'] = int(status.pop('consume', '0'))
        status['single'] = int(status.pop('single', '0'))
        status['song'] = int(status.pop('song', '0'))
        status['songid'] = int(status.pop('songid', '0'))
        status['nextsong'] = int(status.pop('nextsong', '0'))
        status['nextsongid'] = int(status.pop('nextsongid', '0'))
        status['playlist'] = int(status.pop('playlist', '0'))
        status['playlistlength'] = int(status.pop('playlistlength', '0'))
        status['mixrampdb'] = float(status.pop('mixrampdb', '0'))
        status['elapsed'] = float(status.pop('elapsed', '0'))
        status['bitrate'] = int(status.pop('bitrate', '0'))
        status['duration'] = float(status.pop('duration', '0'))
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


async def notifier(client, queue):
    # receive command,
    # send command
    # update state
    # notify clients
    laststate = await client.status()
    parse_status(laststate)

    while True:
        command, fut = await queue.get()
        result = await command
        print(f'got command, {result=}')
        fut.set_result(result)

        newstate = await client.status()
        parse_status(newstate)

        print(f'{newstate=}, {len(clients)=}')

        if newstate != laststate:
            laststate = newstate
            msg = pb.StatusResult(**newstate)
            for each in clients:
                await each.send_message(msg)

        queue.task_done()


# old, need to replace
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

    print(f'mpd version: {client.mpd_version}')

    queue = asyncio.Queue()
    commands_queue = asyncio.Queue()
    
    task1 = asyncio.create_task(worker(queue)) # TODO: remove
    task2 = asyncio.create_task(notifier(client, commands_queue))

    server = Server([WallboxApi(commands_queue, queue, client)])

    with graceful_exit([server]):
        await server.start(host, port)
        await server.wait_closed()

    task1.cancel()
    task2.cancel()
    client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
