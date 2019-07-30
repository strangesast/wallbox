console.log('toast');

async function newlines(gen) {
	let last = '', pieces = [];
	for await (const buf of gen) {
    last += buf.toString('utf8');
		pieces = last.split('\r\n');
		last = pieces.pop();
		// yield* pieces;
	}
  // yield last;
}

(function test() {
  const f = (async function* () {
		const text = 'The quick brown fox\r\n jumps over the lazy dog\r\n';
		let i = 0;
		while (i < text.length) {
			const n = Math.random() * 4;
			yield text.substr(i, n);
			await new Promise(r => setTimeout(r, 100));
			i += n;
		}
	})();
	for await (const each of f) {
		console.log(each);
	}
	/*
	const g = newlines(f);

	for (const each of g) {
		console.log(each);

	}
	*/
})();

(async function() {
  const { once } = require('events');
  const { Socket } = require('net');
  const SerialPort = require('serialport')
  const Readline = require('@serialport/parser-readline')
  
  
  const SERIAL_PORT = '/dev/ttyS0';
  
  CHARS = 'ABCDEFGHJKLMNPQRSTUV';
  NUMS = '12345678';
  SONG_MAP = {};
  
  
  const client = new Socket();
  client.connect(6600, 'localhost');
  await once(client, 'connect');
  console.log('connected to mpd!');

  console.log('requesting stats');
  client.write('stats\n');

  for await (const line of client) {
    console.log(line.toString('utf8'));
  }

  // client.on('data', data => {
  //   const str = data.toString('utf8');
  //   for (const line of str.split('\n')) {
  //     console.log('client -> ' + line);
  //   }
  // });
  // 
  // client.on('error', err => {
  //   console.error(err);
  // });
  // 
  // client.on('close', () => {
  //   console.log('client closed');
  // });
  // 
 
 
  const ports = await SerialPort.list();
  if (ports.findIndex(p => p.comName === SERIAL_PORT) == -1) {
    throw new Error(`cannot access ${SERIAL_PORT}. not found!`);
  }

  const sp = new SerialPort(SERIAL_PORT);
  const parser = sp.pipe(new Readline({ delimiter: '\r\n' }));

  await once(sp, 'open')

  console.log('Port opened.');

  parser.on('data', line => {
    const inp = line.trim().split(':');
    switch (inp[0]) {
      case "hb": {
        console.log('heartbeat');
        break;
      }
      case "input": {
        key = inp[1].split(',').join('-');
        console.log(`got ${key}`);
        name = SONG_MAP[key];
        if (name != null) {
          console.log('playing {}'.format(name));
          play(key);
    	  } else {
          console.log('no song attached to that combination');
    	  }
      }
      default: 
        console.log(JSON.stringify(line));
    }
  });

  sp.on('error', e => {
    console.error(e);
  });

  sp.on('close', () => {
    console.log('Port closed.');
  });
})();
