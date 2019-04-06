const assert = require('assert').strict;
const {Socket} = require('net');
const config = require('../config');

const commands = require('../commands');

function setupSocket() {
  return new Promise(resolve => {
    const socket = new Socket();
    socket.connect(config.mpd.socketPath, () => {
      socket.once('data', buf => {
        const data = buf.toString();
        if (data.startsWith('OK MPD')) {
          resolve(socket);
          return;
        }
        throw new Error(`unexpected socket init response ${JSON.stringify(data)}`);
      });
    });
  });
}

describe('commands', () => {
  let process, socket;
  beforeEach(async () => {
    socket = await setupSocket();
  });
  afterEach(cb => socket.end(cb));

  for (const [commandName, parameters] of Object.entries(commands)) {
    if (parameters.deprecated) {
      continue;
    }
    describe(`command: ${commandName}`, () => {
      it('commandName should be string', () => {
        assert.equal(typeof commandName, "string");
      });
      if (commandName === 'idle') {
        it('should wait until second command runs', async () => {
          console.log('waiting on second socket');
          const secondSocket = await setupSocket();
          console.log('waiting on second socket. DONE.');

          cb0 = new Promise(r => socket.once('data', buf => r(buf.toString())));
          cb1 = new Promise(r => secondSocket.once('data', buf => r(buf.toString())));

          socket.write(`idle mixer\n`);
          await new Promise(r => setTimeout(r, 500));
          secondSocket.write('setvol 0\n')
          const [triggerRespose, idleResponse] = await Promise.all([cb1, cb0]);
          console.log(JSON.stringify(triggerRespose));
          console.log(JSON.stringify(idleResponse));
        }).timeout(5000);
      } else {
        it('should run command via socket', async () => {
          socket.write(`${commandName}\n`);
          const data = await new Promise(r => socket.once('data', buf => r(buf.toString())));
          console.log(JSON.stringify(data));
        }).timeout(5000);
      }
    });
  }
});
