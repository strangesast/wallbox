FROM python:3

WORKDIR /app
COPY server/requirements.txt .
RUN python3 -m pip install -r requirements.txt

COPY proto/wallbox.proto .
RUN python3 -m grpc_tools.protoc \
  -I=. \
  --python_out=. \
  --python_grpc_out=. \
  ./wallbox.proto

COPY server/server.py  .

CMD ["python3", "-u", "server.py"]
