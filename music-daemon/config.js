const env = process.env.NODE_ENV;

const config = {
  'dev': {
    mpd: {
      socketPath: '/var/run/mpd/socket'
    }
  },
  'test': {
    mpd: {
      socketPath: '/var/run/mpd/socket'
    }
  },
};

module.exports = config[env];
