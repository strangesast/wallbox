import os
import asyncio

SERVER_HOST = os.environ.get('SERVER_HOST') or 'localhost'

async def tcp_echo_client():
    reader, writer = await asyncio.open_connection(
        SERVER_HOST, 6600)

    data = await reader.read(100)
    print(f'Received: {data.decode()!r}')

    print('adding...')
    writer.write('findadd "(ARTIST != \\"toast\\")"\n'.encode())

    data = await reader.read(100)
    print(f'Received: {data.decode()!r}')

    print('playing...')
    writer.write('play 0\n'.encode())

    data = await reader.read(100)
    print(f'Received: {data.decode()!r}')

    await asyncio.sleep(1)

    #print('pausing...')
    #writer.write('pause 1\n'.encode())

    #data = await reader.read(100)
    #print(f'Received: {data.decode()!r}')



    print('Close the connection')
    writer.close()
    await writer.wait_closed()

asyncio.run(tcp_echo_client())
