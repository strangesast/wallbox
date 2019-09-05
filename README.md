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

If everything works, the web client will be accessible at localhost:8080
Live reloading works great for the web client and server but changes to mpd config, envoy proxy settings, and protobuf definitions (and others) will require restart of those services.
