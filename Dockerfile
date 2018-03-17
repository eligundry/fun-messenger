FROM node:8-slim

RUN apt-get update \
    && apt-get install -y nginx \
    && rm -r /var/lib/apt/lists/*

# Install node packages
ADD package.json /opt/fun-messenger/package.json
WORKDIR /opt/fun-messenger
RUN npm install

ADD . /opt/fun-messenger
RUN npm run build

