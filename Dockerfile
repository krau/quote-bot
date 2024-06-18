FROM oven/bun:latest

ENV WORKDIR /app
WORKDIR $WORKDIR

ADD . $WORKDIR

RUN bun install
