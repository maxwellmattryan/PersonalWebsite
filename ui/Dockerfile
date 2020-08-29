# Layers for base image
FROM node:12.18.3-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN apk add git # Needed for dependency from GitHub
RUN npm install
COPY . ./

CMD ["npm", "start"]