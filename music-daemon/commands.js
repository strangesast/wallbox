module.exports = {
  'clearerror': {
    parser: /file/,
    type: 'status',
    responseType: 'string',
  },
  'currentsong': {
    parser: /file/,
    type: 'status',
    responseType: 'string',
  },
  'idle': {
    parser: /file/,
    type: 'status',
    responseType: 'string',
  },
  'status': {
    parser: /file/,
    type: 'status',
    responseType: 'string',
  },
  'stats': {
    parser: /file/,
    type: 'status',
    responseType: 'string',
  },
  'consume': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'crossfade': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'mixrampdb': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'mixrampdelay': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'random': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'repeat': {
    parser: /file/,
    type: 'playbackOption',
  },
  'setvol': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'single': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'replay_gain_mode': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'replay_gain_status': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
  },
  'volume': {
    parser: /file/,
    type: 'playbackOption',
    responseType: 'string',
    deprecated: true,
  },
  'next': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'pause': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'play': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'playid': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'previous': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'seek': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'seekid': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'seekcur': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'stop': {
    parser: /file/,
    type: 'playbackControl',
    responseType: 'string',
  },
  'add': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'addid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'clear': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'delete': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'deleteid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'move': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'moveid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'playlist': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'playlistfind': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'playlistid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'playlistinfo': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'playlistsearch': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'plchanges': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'plchangesposid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'prio': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'prioid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'rangeid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'shuffle': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'swap': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'swapid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'addtagid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'cleartagid': {
    parser: /file/,
    type: 'queue',
    responseType: 'string',
  },
  'listplaylist': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'listplaylistinfo': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'listplaylists': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'load': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'playlistadd': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'playlistclear': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'playlistdelete': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'playlistmove': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'rename': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'rm': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'save': {
    parser: /file/,
    type: 'playlist',
    responseType: 'string',
  },
  'albumart': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'count': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'find': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'findadd': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'list': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'listall': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
    deprecated: true,
  },
  'listallinfo': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
    deprecated: true,
  },
  'listfiles': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'lsinfo': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'readcomments': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'search': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'searchadd': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'searchaddpl': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'update': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'rescan': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'mount': {
    parser: /file/,
    type: 'mount',
    responseType: 'string',
  },
  'unmount': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'listmounts': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'listneighbors': {
    parser: /file/,
    type: 'database',
    responseType: 'string',
  },
  'close': {
    parser: /file/,
    type: 'connection',
    responseType: null,
    deprecated: true,
  },
  'kill': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
    deprecated: true,
  },
  'password': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'ping': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'tagtypes': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'partition': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'listpartitions': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'newpartition': {
    parser: /file/,
    type: 'connection',
    responseType: 'string',
  },
  'disableoutput': {
    parser: /file/,
    type: 'devices',
    responseType: 'string',
  },
  'enableoutput': {
    parser: /file/,
    type: 'devices',
    responseType: 'string',
  },
  'toggleoutput': {
    parser: /file/,
    type: 'devices',
    responseType: 'string',
  },
  'outputs': {
    parser: /file/,
    type: 'devices',
    responseType: 'string',
  },
  'outputset': {
    parser: /file/,
    type: 'devices',
    responseType: 'string',
  },
  'config': {
    parser: /file/,
    type: 'reflection',
    responseType: 'string',
  },
  'commands': {
    parser: /file/,
    type: 'reflection',
    responseType: 'string',
  },
  'notcommands': {
    parser: /file/,
    type: 'reflection',
    responseType: 'string',
  },
  'urlhandlers': {
    parser: /file/,
    type: 'reflection',
    responseType: 'string',
  },
  'decoders': {
    parser: /file/,
    type: 'reflection',
    responseType: 'string',
  },
};
