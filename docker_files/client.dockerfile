FROM python:latest
COPY ./DalTourism ./
EXPOSE 7000
CMD python -m http.server 7000