FROM nikolaik/python-nodejs:python3.11-nodejs20-alpine

ENV WORKDIR /app
WORKDIR $WORKDIR

ADD . $WORKDIR

RUN apk add --no-cache g++ make && \
    npm install && apk del g++ make