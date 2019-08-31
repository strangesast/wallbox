FROM python:3

WORKDIR /app
COPY server/requirements.txt .
RUN python3 -m pip install -r requirements.txt
COPY server/server.py  .

CMD ["python3", "-u", "server.py"]
