const EXAMPLE_SONGID = '';
const EXAMPLE_SONGID2 = '';
module.exports = {
  'clearerror': {
    command: () => `clearerror\n`,
    testInputs: [
      [],
    ],
    type: 'status',
    responseType: 'string',
  },
  'currentsong': {
    command: () => `currentsong\n`,
    testInputs: [
      [],
    ],
    type: 'status',
    responseType: 'string',
  },
  'idle': {
    command: subsystems => `idle ${subsystems.join(' ')}\n`,
    testInputs: [
      ['mixer'],
    ],
    type: 'status',
    responseType: 'string',
  },
  'status': {
    command: `status\n`,
    testInputs: [
      [],
    ],
    type: 'status',
    responseType: 'string',
  },
  'stats': {
    command: `stats\n`,
    testInputs: [
      [],
    ],
    type: 'status',
    responseType: 'string',
  },
  'consume': {
    command: state => `consume ${state}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'crossfade': {
    command: seconds => `crossfade ${seconds}\n`,
    testInputs: [
      [1],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'mixrampdb': {
    command: decibels => `mixrampdb ${decibels}\n`,
    testInputs: [
      [-17],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'mixrampdelay': {
    command: seconds => `mixrampdelay ${seconds}\n`,
    testInputs: [
      [2],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'random': {
    command: state => `random ${state}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'repeat': {
    command: state => `repeat ${state}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackOption',
  },
  'setvol': {
    command: vol => `setvol ${vol}\n`,
    testInputs: [
      [100],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'single': {
    command: state => `single ${state}\n`,
    testInputs: [
      [1],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'replay_gain_mode': {
    command: mode => `replay_gain_mode ${mode}\n`,
    testInputs: [
      ['track'],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'replay_gain_status': {
    command: `replay_gain_status\n`,
    testInputs: [
      [],
    ],
    type: 'playbackOption',
    responseType: 'string',
  },
  'volume': {
    command: change => `volume ${change}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackOption',
    responseType: 'string',
    deprecated: true,
  },
  'next': {
    command: `next\n`,
    testInputs: [
      [],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'pause': {
    command: pause => `pause ${pause}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'play': {
    command: songpos => `play ${songpos}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'playid': {
    command: songid => `playid ${songid}\n`,
    testInputs: [
      [0],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'previous': {
    command: `previous\n`,
    testInputs: [
      [],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'seek': {
    command: (songpos, time) => `seek ${songpos} ${time}\n`,
    testInputs: [
      [0, 0.1],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'seekid': {
    command: (songid, time) => `seekid ${songpos} ${time}\n`,
    testInputs: [
      [EXAMPLE_SONGID, 0.1],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'seekcur': {
    command: time => `seekcur ${time}\n`,
    testInputs: [
      [0.01],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'stop': {
    command: `stop\n`,
    testInputs: [
      [],
    ],
    type: 'playbackControl',
    responseType: 'string',
  },
  'add': {
    command: uri => `add ${uri}\n`,
    testInputs: [
      [EXAMPLE_URI]
    ],
    type: 'queue',
    responseType: 'string',
  },
  'addid': {
    command: (uri, position) => `addid ${uri} ${position}\n`,
    testInputs: [
      [EXAMPLE_URI, 0],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'clear': {
    command: `clear\n`,
    testInputs: [
      [],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'delete': {
    command: (pos) => `delete ${Array.isArray(pos) ? fmtRange(pos) : pos}\n`,
    testInputs: [
      [0],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'deleteid': {
    command: songid => `deleteid ${songid}\n`,
    testInputs: [
      [EXAMPLE_SONGID],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'move': {
    command: (from, to) => `${Array.isArray(from) ? fmtRange(from) : from} ${to}\n`,
    testInputs: [
      [0, 1],
      [[0, 1], 2],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'moveid': {
    command: (from, to) => `moveid ${from} ${to}\n`,
    testInputs: [
      [EXAMPLE_SONGID, 2],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'playlist': {
    command: `playlist\n`,
    testInputs: [
      [],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'playlistfind': {
    command: (tag, needle) => `playlistfind ${tag} ${needle}\n`,
    testInputs: [
      [EXAMPLE_TAG, ''],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'playlistid': {
    command: songid => `playlistid ${songid}\n`,
    testInputs: [
      [EXAMPLE_SONGID],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'playlistinfo': {
    command: pos => `playlistinfo ${Array.isArray(pos) ? pos.slice(0, 2).join(':') : pos}\n`,
    testInputs: [
      [],
      [0],
      [[0, 1]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'playlistsearch': {
    command: (tag, needle) => `playlistsearch ${tag} ${needle}\n`,
    testInputs: [
      [EXAMPLE_TAG, ''],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'plchanges': {
    command: (version, range) => `plchanges ${version}` + range != null ? (' ' + fmtRange(range)) : '' + '\n',
    testInputs: [
      [EXAMPLE_PLAYLIST-VERSION],
      [EXAMPLE_PLAYLIST-VERSION, [0, 1]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'plchangesposid': {
    command: (version, range) => `plchangesposid ${version}` + range != null ? (' ' + fmtRange(range)) : '' + '\n',
    testInputs: [
      [EXAMPLE_PLAYLIST-VERSION],
      [EXAMPLE_PLAYLIST-VERSION, [0, 1]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'prio': {
    command: (priority, range) => `prio ${priority} ${fmtRange(range)}\n`,
    testInputs: [
      [100, [0, 1]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'prioid': {
    command: (priority, id) => `prioid ${priority} ${id}\n`,
    testInputs: [
      [100, EXAMPLE_SONGID],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'rangeid': {
    command: (id, range) => `rangeid ${id} ${fmtRange(range)}\n`,
    testInputs: [
      [EXAMPLE_SONGID, [null, 5]],
      [EXAMPLE_SONGID, [4, 5]],
      [EXAMPLE_SONGID, [4, null]],
      [EXAMPLE_SONGID, [null, null]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'shuffle': {
    command: range => `shuffle` + range != null ? fmtRange(range) : '' + '\n',
    testInputs: [
      [],
      [[0, 4]],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'swap': {
    command: (songPos1, songPos2) => `swap ${songPos1} ${songPos2}\n`,
    testInputs: [
      [0, 1],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'swapid': {
    command: (song1, song2) => `swapid ${song1} ${song2}\n`,
    testInputs: [
      [EXAMPLE_SONGID, EXAMPLE_SONGID2],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'addtagid': {
    command: (songid, tag, value) => `addtagid ${songid} ${tag} ${value}\n`,
    testInputs: [
      [EXAMPLE_SONGID, 'testTag', 'tesTagValue'],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'cleartagid': {
    command: (songid, tag) => `cleartagid ${songid}` + tag != null ? 'tag' : '' + '\n',
    testInputs: [
      [EXAMPLE_SONGID],
      [EXAMPLE_SONGID, 'testTag'],
    ],
    type: 'queue',
    responseType: 'string',
  },
  'listplaylist': {
    command: name => `listplaylist ${name}\n`,
    testInputs: [
      ['playlistName'],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'listplaylistinfo': {
    command: name => `listplaylistinfo ${name}\n`,
    testInputs: [
      ['playlistName'],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'listplaylists': {
    command: `listplaylists\n`,
    testInputs: [
      [],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'load': {
    command: (name, range) => `load ${name}` + range != null ? fmtRange(range) : '' + '\n',
    testInputs: [
      ['playlistName'],
      ['playlistName', [0, 4]],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'playlistadd': {
    command: (name, uri) => `playlistadd ${name} ${uri}\n`,
    testInputs: [
      ['playlistName', EXAMPLE_URI],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'playlistclear': {
    command: name => `playlistclear ${name}\n`,
    testInputs: [
      ['playlistName']
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'playlistdelete': {
    command: (name, songpos) => `playlistdelete ${name} ${songpos}\n`,
    testInputs: [
      ['playlistName', 1],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'playlistmove': {
    command: (name, fromPos, toPos) => `playlistmove ${name} ${fromPos} ${toPos}\n`,
    testInputs: [
      ['playlistName', 0, 1],
    ],
    type: 'playlist',
    responseType: 'string',
  },
  'rename': {
    command: (name, newname) => `rename ${name} ${newName}\n`,
    testInputs: [],
    type: 'playlist',
    responseType: 'string',
  },
  'rm': {
    command: name => `rm ${name}\n`,
    testInputs: [],
    type: 'playlist',
    responseType: 'string',
  },
  'save': {
    command: name => `save ${name}\n`,
    testInputs: [],
    type: 'playlist',
    responseType: 'string',
  },
  'albumart': {
    command: (uri, offset) => `albumart` + uri != null ? (' ' + uri) : '' + offset != null ? (' ' + offset) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'count': {
    command: (filter, group) => `count` + filter != null ? (' ' + filter) : '' + group != null ? (' ' + group) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'find': {
    command: (filter, sort, window) => `find ${filter}` + sort != null ? (' ' + sort) : '' + window != null ? (' ' + fmtRange(window)) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'findadd': {
    command: filter => `findadd ${filter}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'list': {
    command: (type, filter, group) => `list ${type} ${filter}` + group != null ? (' ' + group) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'listall': {
    command: uri => `listall ${uri}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
    deprecated: true,
  },
  'listallinfo': {
    command: uri => `listallinfo ${uri}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
    deprecated: true,
  },
  'listfiles': {
    command: uri => `listfiles` + uri != null ? (' ' + uri) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'lsinfo': {
    command: uri => `lsinfo ${uri}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'readcomments': {
    command: uri => `readcomments` url != null ? (' ' + uri) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'search': {
    command: (filter, sort, window) => `search ${filter}` + sort != null ? (' ' + sort) : '' + window != null ? (' ' + fmtRange(window)) : '' + '\n',
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'searchadd': {
    command: filter => `searchadd ${filter}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'searchaddpl': {
    command: (name, filter) => `searchaddpl ${name} ${filter}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'update': {
    command: uri => `update` + uri != null ? (' ' + uri) : '' + \n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'rescan': {
    command: uri => `rescan` + uri != null ? (' ' + uri) : '' + \n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'mount': {
    command: (path, uri) => `mount ${path} ${uri}\n`,
    testInputs: [],
    type: 'mount',
    responseType: 'string',
  },
  'unmount': {
    command: path => `unmount ${path}\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'listmounts': {
    command: `listmounts\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'listneighbors': {
    command: `listneighbors\n`,
    testInputs: [],
    type: 'database',
    responseType: 'string',
  },
  'close': {
    command: `close\n`,
    testInputs: [],
    type: 'connection',
    responseType: null,
    deprecated: true,
  },
  'kill': {
    command: `kill\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
    deprecated: true,
  },
  'password': {
    command: password => `password ${password}\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'ping': {
    command: `ping\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'tagtypes': {
    command: command => `tagtypes' + command != null ? (' ' + command) : '' + '\n',
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'partition': {
    command: name => `partition ${name}\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'listpartitions': {
    command: `listpartitions\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'newpartition': {
    command: name => `newpartition ${name}\n`,
    testInputs: [],
    type: 'connection',
    responseType: 'string',
  },
  'disableoutput': {
    command: id => `disableoutput ${id}\n`,
    testInputs: [],
    type: 'devices',
    responseType: 'string',
  },
  'enableoutput': {
    command: id => `enableoutput ${id}\n`,
    testInputs: [],
    type: 'devices',
    responseType: 'string',
  },
  'toggleoutput': {
    command: id => `toggleoutput ${id}\n`,
    testInputs: [],
    type: 'devices',
    responseType: 'string',
  },
  'outputs': {
    command: `outputs\n`,
    testInputs: [],
    type: 'devices',
    responseType: 'string',
  },
  'outputset': {
    command: (id, name, value) => `outputset ${id} ${name} ${value}\n`,
    testInputs: [],
    type: 'devices',
    responseType: 'string',
    parser: txt => {
    },
  },
  'config': {
    command: `config\n`,
    testInput: [],
    type: 'reflection',
    responseType: 'string',
    parser: txt => {
      const re = /(?<keyName>\w+): (?<valueName>[\w\/\+\-]+)/g;
      let match, config = {};
      while ((match = re.exec(txt)) !== null) {
        const {keyName, valueName} = match.groups;
        config[keyName] = valueName;
      }
      return config;
    },
  },
  'commands': {
    command: `commands\n`,
    testInputs: [],
    type: 'reflection',
    responseType: 'string',
    parser: txt => {
      const re = /command: (?<command>[\w]+)/g;
      let match, commands = [];
      while ((match = re.exec(txt)) !== null) {
        const {command} = match.groups;
        commands.push(command);
      }
      return commands;
    },
  },
  'notcommands': {
    command: `notcommands\n`,
    testInputs: [],
    type: 'reflection',
    responseType: 'string',
  },
  'urlhandlers': {
    command: `urlhandlers\n`,
    testInputs: [],
    type: 'reflection',
    responseType: 'string',
    parser: txt => {
      const re = /handler: (?<handler>[\w]+:\/\/)/g;
      let match, handlers = [];
      while ((match = re.exec(txt)) !== null) {
        const {handler} = match.groups;
        handlers.push(handler);
      }
      return handlers;
    },
  },
  'decoders': {
    command: `decoders\n`,
    testInputs: [],
    type: 'reflection',
    responseType: 'string',
    parser: txt => {
      const re = /(?<keyName>\w+): (?<valueName>[\w\/\+\-]+)/g
      let match, plugin, plugins = [];
      while ((match = re.exec(txt)) !== null) {
        const {keyName, valueName} = match.groups;
        if (keyName === 'plugin') {
          if (plugin != null) {
            plugins.push(plugin);
          }
          plugin = {name: valueName};
        } else if (plugin != null) {
          plugin[keyName] = (plugin[keyName] == null ? [valueName] : [...plugin[keyName], valueName]);
        }
      }
      return plugins;
    },
  },
};

function fmtRange(arr) {
  return arr.slice(0, 2).join(':');
}
