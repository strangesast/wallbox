const assert = require('assert').strict;
const {Socket} = require('net');
const config = require('../config');
const fs = require('fs');

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

const outputDir = path.resolve(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

describe('commands', () => {
  let process, socket, oof = false;
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
          const secondSocket = await setupSocket();

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
          if (parameters.parser) {
            const result = parameters.parser(data);
            if (!oof) {
              console.log(result);
              oof = true;
            }
          }
          fs.writeFileSync(path.join(outputDir, `${commandName}.txt`), data);
        }).timeout(5000);
      }
    });
  }
});
