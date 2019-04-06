const net = require('net');
const socket = new net.Socket();
const {stdin, stdout} = process;

const versionRe = /^OK MPD (?<version>[0-9.]+)\n$/;

(async function() {
  socket.setEncoding('utf8');
  socket.connect('/var/run/mpd/socket');

  const socketIterator = socket[Symbol.asyncIterator]();
  const stdinIterator = stdin[Symbol.asyncIterator]();

  let version;
  while (true) {
    const {value: buf, done} = await socketIterator.next();
    const msg = buf.toString();
    const match = versionRe.exec(msg);
    if (match != null) {
      version = match.groups.version;
      break;
    }
  }

  console.log(`init. protocol version ${version}`);

  while (true) {
    const [name, {done, value: buf}] = await Promise.race([['socket', socketIterator], ['stdin', stdinIterator]].map(([name, iter]) => iter.next().then(res => [name, res])));

    if (done) {
      break;
    }
    switch (name) {
      case 'stdin': {
        console.log(`Writing ${JSON.stringify(buf.toString())}`);
        socket.write(buf);
        break;
      }
      case 'socket': {
        const response = buf.toString();
        console.log(`Received ${JSON.stringify(response)}`);
        console.log(response);
        break;
      }
    }
  }
  socket.destroy();
})();
