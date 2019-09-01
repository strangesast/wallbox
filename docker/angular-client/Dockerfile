FROM node:12

WORKDIR /tmp

# get protobuf
RUN wget https://github.com/protocolbuffers/protobuf/releases/download/v3.9.1/protoc-3.9.1-linux-x86_64.zip -O protoc.zip && \
  unzip protoc.zip -d protoc3
RUN mv protoc3/bin/* /usr/local/bin/ && mv protoc3/include/* /usr/local/include/

# get web plugin
RUN wget https://github.com/grpc/grpc-web/releases/download/1.0.6/protoc-gen-grpc-web-1.0.6-linux-x86_64 -O protoc-gen-grpc-web && \
  mv protoc-gen-grpc-web /usr/local/bin/protoc-gen-grpc-web && \
  chmod +x /usr/local/bin/protoc-gen-grpc-web

WORKDIR /proto
COPY proto/wallbox.proto .

RUN protoc --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:. \
  ./wallbox.proto


WORKDIR /app
COPY angular-client/package*.json ./
RUN npm install
COPY angular-client/ ./
RUN npm run-script build

FROM nginx

COPY --from=0 /app/dist/wallbox/ /usr/share/nginx/html/
COPY nginx/angular-client.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
