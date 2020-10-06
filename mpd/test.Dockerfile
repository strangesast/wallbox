from alpine

run apk add --no-cache mpd mpc
copy mpd.conf /etc/mpd.conf

run mkdir -p /var/log/mpd /var/lib/mpd /mpd/music /mpd/playlists

cmd mpd --verbose --no-daemon /etc/mpd.conf
