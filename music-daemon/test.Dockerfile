FROM mpd

COPY mpd.conf /etc/mpd.conf

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y supervisor nodejs

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY piano2.wav /var/lib/mpd/music/

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV NODE_ENV=test

CMD mpd /etc/mpd.conf && /app/node_modules/.bin/mocha
