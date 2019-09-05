#!/bin/bash
python3 -m grpc_tools.protoc -I. --python_out=. --python_grpc_out=. wallbox.proto
protoc --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:. \
  ./wallbox.proto
