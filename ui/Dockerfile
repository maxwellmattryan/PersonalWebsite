## BUILD STAGE ##
FROM node:12.18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

RUN npm run build:prod

## PRODUCTION STAGE ##
FROM node:12.18-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

COPY --from=builder /usr/src/app/dist ./dist
COPY ./public/* ./dist

CMD ["npm", "run", "start"]