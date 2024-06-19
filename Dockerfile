FROM nikolaik/python-nodejs:python3.11-nodejs20

ENV WORKDIR /app
WORKDIR $WORKDIR

ADD . $WORKDIR

RUN npm install