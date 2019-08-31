FROM debian:9

RUN apt-get update && apt-get install -y \
  wget \
  xz-utils \
  build-essential \
  g++ \
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
  libicu-dev \
  libffi-dev \
  libreadline-gplv2-dev \
  libncursesw5-dev \
  libssl-dev \
  libsqlite3-dev \
  tk-dev \
  libgdbm-dev \
  libc6-dev \
  libbz2-dev \
  ninja-build

WORKDIR /tmp

RUN wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tar.xz

RUN tar -xf Python-3.7.4.tar.xz && \
  cd Python-3.7.4 && \
  ./configure --enable-optimizations

RUN cd Python-3.7.4 && \
  make -j 8 && \
  make altinstall

RUN python3.7 -m pip install meson

RUN wget https://www.musicpd.org/download/mpd/0.21/mpd-0.21.14.tar.xz

RUN tar -xf mpd-0.21.14.tar.xz

RUN cd /tmp/mpd-0.21.14 && \
  meson . output/release --buildtype=debugoptimized -Db_ndebug=true && \
  ninja -C output/release && \
  ninja -C output/release install

RUN mkdir -p /var/log/mpd /var/lib/mpd/music /var/lib/mpd/playlists
COPY server/mpd.conf /etc/mpd.conf

CMD mpd --no-daemon /etc/mpd.conf
#CMD ["mpd", "--verbose", "--no-daemon", "/etc/mpd.conf"]
