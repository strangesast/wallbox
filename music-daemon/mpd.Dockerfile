FROM debian:9

RUN apt-get update && apt-get install -y python3 \
  python3-pip \
  ninja-build \
  wget \
  xz-utils \
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
  libicu-dev
RUN pip3 install meson

# mpd
RUN wget http://www.musicpd.org/download/mpd/0.21/mpd-0.21.7.tar.xz -P /tmp/
RUN mkdir -p /opt/mpd && tar -xf /tmp/mpd-0.21.7.tar.xz -C /opt/mpd --strip-components 1
WORKDIR /opt/mpd/
RUN meson . output/release --buildtype=debugoptimized -Db_ndebug=true
RUN ninja -C output/release
RUN ninja -C output/release install

# mpc
RUN wget https://www.musicpd.org/download/mpc/0/mpc-0.31.tar.xz -P /tmp/
RUN mkdir -p /opt/mpc && tar -xf /tmp/mpc-0.31.tar.xz -C /opt/mpc --strip-components 1
WORKDIR /opt/mpc/
RUN meson . output/release
RUN ninja -C output/release
RUN ninja -C output/release install

RUN bash -c 'mkdir -p /var/lib/mpd/{music,playlists}'
RUN mkdir -p /var/log/mpd
RUN mkdir -p /var/run/mpd
