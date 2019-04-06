// find "(Title == 'Piano2')"

const {Socket, Duplex} = require('net');
const {Server: WebsocketServer} = require('ws');

const versionRe = /^OK MPD (?<version>[0-9.]+)\n$/;
const fileRe = /file: (?<uri>[\w.]+)\nLast-Modified: (?<lastModified>[0-9\-:TZ]+)\nFormat: (?<format>[0-9:]+)\nTime: (?<time>[0-9]+)\nduration: (?<duration>[0-9.]+)\nTitle: (?<title>[\w.]+)\nOK\n/;

const wss = new WebsocketServer({port: 8080});

wss.on('connection', ws => {
  console.log('Websocket server connection.');
});

const socket = new Socket();

socket.connect('/var/run/mpd/socket');

socket.on('data', buf => {

});

socket.on('close', () => {
  console.log('Connection closed.');
});
