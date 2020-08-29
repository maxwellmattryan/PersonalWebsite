# Layers for base image
FROM node:12.18.3-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g @nestjs/cli
RUN npm install --only=production
COPY . ./
RUN npm run build

CMD ["npm", "start"]