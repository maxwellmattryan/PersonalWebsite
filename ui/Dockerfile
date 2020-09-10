## BUILD STAGE ##
FROM node:12.18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

RUN npm run build:prod

## PRODUCTION STAGE ##
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./public/. /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]