# wallbox
Project to adapt a 1950's era wall-box jukebox remote to control a Sonos / Google Music / MP3 player output.  
[Google Photos Album](https://photos.app.goo.gl/iEbUDsr8W9gLysSi8)

<a href="https://github.com/strangesast/wallbox/blob/master/models/wallbox.stl"><img src="https://raw.githubusercontent.com/strangesast/wallbox/master/images/wallbox.png" height="500"/></a>

## Control Circuit Schematic
![schematic](./arduino/schematic_cropped.svg)

## Block Diagram
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRynbvI-NA6Aekktnynbwu819yJeXTGQum5wE03oxbrlnyjgHrdO3c4ZdSsHouRIe413oO9Hbzj2GRE/pub?w=1574&amp;h=1103">

Lots of help from the following:
* [www.smbaker.com/converting-a-seeburg-3wa-wallbox-into-a-remote-for-a-modern-music-player](http://www.smbaker.com/converting-a-seeburg-3wa-wallbox-into-a-remote-for-a-modern-music-player) 
* [www.retrofutureelectrics.com/seeburg-wall-o-matic/](https://www.retrofutureelectrics.com/seeburg-wall-o-matic/) 

# Getting started
```
docker-compose up
```

# Developing
In separate tabs / splits / etc:  

mpd & envoy  
```
docker-compose -f dev.yml up
```

grpc server
```
cd grpc-server/
python3.8 -m venv env
source env/bin/activate
pip install -r requirements.txt
python3 server.py
# or
npm install nodemon
./node_modules/.bin/nodemon --exec ./env/bin/python3 server.py 
```

angular web client
```
cd angular-client/
npm install
npm start
```

If everything works, the web client will be accessible at 0.0.0.0:8080  
Live reloading works through `webpack-dev-server` for the web client and optionally `nodemon` for the server but changes to mpd config, envoy proxy settings, and protobuf definitions (and others) will require restart of those services.
