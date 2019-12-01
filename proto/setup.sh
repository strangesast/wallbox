#!/bin/bash
wget -P /tmp/ https://github.com/protocolbuffers/protobuf/releases/download/v3.11.0/protoc-3.11.0-linux-x86_64.zip
mkdir protoc
unzip /tmp/protoc-3.11.0-linux-x86_64.zip -d protoc
