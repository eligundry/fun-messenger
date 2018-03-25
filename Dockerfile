FROM node:8-slim

EXPOSE 8888

# Nginx will serve the static site
RUN apt-get update \
    && apt-get install -y nginx \
    && rm -r /var/lib/apt/lists/*
ADD docker/nginx/fontend.conf /etc/nginx/sites-enabled/default

# Install node packages
ADD package.json /opt/fun-messenger/package.json
WORKDIR /opt/fun-messenger
RUN npm install

# Build the app
ADD . /opt/fun-messenger
RUN npm run docker-build

ENTRYPOINT ["nginx", "-g", "daemon off;"]
