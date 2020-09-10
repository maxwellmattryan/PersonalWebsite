FROM node:12.18-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

RUN npm run build:prod

FROM node:12.18-alpine AS prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install --only=prod

COPY . .

COPY --from=dev /usr/src/app/dist ./dist
COPY ./public/. ./dist/

CMD ["npm", "run", "start"]