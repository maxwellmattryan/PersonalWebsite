FROM node:12.18-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

RUN npm run build:prod

FROM node:12.18-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install --only=prod

COPY . .

COPY --from=dev /usr/src/app/dist ./dist
COPY ./public/. ./dist/

CMD ["npm", "run", "start"]