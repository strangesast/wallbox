from golang:alpine as builder

run apk add --no-cache wget alsa-utils

run wget https://github.com/MusicPlayerDaemon/MPD/archive/v0.21.25.tar.gz -P /tmp
run mkdir /tmp/mpd && tar xf /tmp/v0.21.25.tar.gz -C /tmp/mpd --strip-components 1

workdir /tmp/mpd

run apk add --no-cache \
  meson \
  binutils \
  clang \
  libc-dev \
  gcc \
  g++ \
  boost \
  boost-dev \
  alsa-utils \
  alsa-utils-doc \
  alsa-lib \
  alsa-lib-dev \
  alsaconf
 

run meson . output/release --buildtype=debugoptimized -Db_ndebug=true && \
  ninja -C output/release && \
  ninja -C output/release install

#from alpine

RUN apk add --no-cache libstdc++
#  alsa-utils \
#  alsa-utils-doc \
#  alsa-lib \
#  alsaconf

#copy --from=builder /tmp/mpd/output/release /mpd

run addgroup mpd && adduser -S -G mpd mpd
run mkdir -p /var/lib/mpd /var/log/mpd /mpd/music /mpd/playlists /mpd/cache && \
  chmod 775 /mpd/music && \
  chmod 775 /mpd && \
  chmod a+rwx /mpd && \
  chmod a+rwx /var/lib/mpd && \
  chmod a+rwx /var/log/mpd && \
  chown -R mpd:mpd /mpd

copy --chown=mpd:mpd music/* /mpd/music/
volume /mpd/music
volume /mpd/playlists

copy mpd.conf /etc/

run apk add mpc
#CMD ["/mpd/mpd", "--verbose", "--no-daemon", "/etc/mpd.conf"]
#CMD ["/tmp/mpd/output/release/mpd", "--verbose", "--no-daemon", "/etc/mpd.conf"]
user mpd
CMD ["mpd", "--verbose", "--no-daemon", "/etc/mpd.conf"]
#CMD ["/tmp/mpd/output/release/mpd", "--version"]
