FROM python:latest
COPY ./server.py ./
COPY ./requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD python server.py