if [[ "$(docker images -q mpd 2> /dev/null)" == "" ]]; then
  docker build -t mpd -f mpd.Dockerfile .
fi
docker run --rm -it $(docker build -q -f test.Dockerfile .)
