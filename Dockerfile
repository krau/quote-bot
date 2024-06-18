FROM node:slim

ENV WORKDIR /app
WORKDIR $WORKDIR

ADD . $WORKDIR

RUN npm install
