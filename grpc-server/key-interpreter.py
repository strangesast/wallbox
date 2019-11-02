import serial
from mpd import MPDClient
from pprint import pprint

client = MPDClient()
client.timeout = 10
client.idletimeout = None
client.connect('localhost', 6600)

client.update()
client.stop()

#print(client.mpd_version)
#print(client.status())
#print(client.stats())

chars = "ABCDEFGHJKLMNPQRSTUV"
nums = "12345678"
song_map = {}
last = None

def get_pairs(a, b):
    for x in a:
        for y in b:
            yield (x, y)

pairs = get_pairs(chars, nums)

for each in client.find('name', ''):
    song_map[next(pairs)] = each['file']

with serial.Serial('/dev/ttyS0', 9600) as ser:
    while True:
        line = ser.readline().decode('utf-8')
        inp = line.strip().split(':')
        if inp[0] == 'hb':
            print('heartbeat')
        elif inp[0] == 'input':
            letter, num = inp[1].split(',')
            key = (letter, num)
            if key == last:
                client.stop()
                last = None
                continue

            name = song_map.get(key)
            print('got {}-{}'.format(letter, num))
            if name is not None:
                print('playing {}'.format(name))
                _id = client.addid(name)
                client.playid(_id)
                last = key
            else:
                print('no song attached to that combination');


client.close()
client.disconnect()


