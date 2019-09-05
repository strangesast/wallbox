#!/bin/bash

python3 -m grpc_tools.protoc -I=../proto/ --python_out=. --python_grpc_out=. ../proto/wallbox.proto
