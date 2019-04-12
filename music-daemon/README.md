mpd setup

get package
```
wget http://www.musicpd.org/download/mpd/0.21/mpd-0.21.6.tar.xz
```

dependencies
```
apt install python3 python3-pip ninja-build
```

more deps
```
apt install g++ \
  libpcre3-dev \
  libmad0-dev libmpg123-dev libid3tag0-dev \
  libflac-dev libvorbis-dev libopus-dev \
  libadplug-dev libaudiofile-dev libsndfile1-dev libfaad-dev \
  libfluidsynth-dev libgme-dev libmikmod2-dev libmodplug-dev \
  libmpcdec-dev libwavpack-dev libwildmidi-dev \
  libsidplay2-dev libsidutils-dev libresid-builder-dev \
  libavcodec-dev libavformat-dev \
  libmp3lame-dev libtwolame-dev libshine-dev \
  libsamplerate0-dev libsoxr-dev \
  libbz2-dev libcdio-paranoia-dev libiso9660-dev libmms-dev \
  libzzip-dev \
  libcurl4-gnutls-dev libyajl-dev libexpat-dev \
  libasound2-dev libao-dev libjack-jackd2-dev libopenal-dev \
  libpulse-dev libshout3-dev \
  libsndio-dev \
  libmpdclient-dev \
  libnfs-dev libsmbclient-dev \
  libupnp-dev \
  libavahi-client-dev \
  libsqlite3-dev \
  libsystemd-dev \
  libgtest-dev \
  libboost-dev \
  libicu-dev
```

meson
```
pip3 install meson
```

build
```
meson . output/release --buildtype=debugoptimized -Db_ndebug=true
ninja -C output/release
ninja -C output/release install
```
