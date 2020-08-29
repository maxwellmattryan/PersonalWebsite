# Layers for base image
FROM node:12.18.3-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g @angular/cli
RUN apk add git # Needed for dependency from GitHub
RUN npm install --only=production
COPY . ./

CMD ["npm", "start"]