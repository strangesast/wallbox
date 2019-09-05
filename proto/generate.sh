#!/bin/bash
python3 -m grpc_tools.protoc -I. --python_out=. --python_grpc_out=. wallbox.proto
