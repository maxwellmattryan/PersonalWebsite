## BUILD STAGE ##
FROM node:15.8.0-alpine3.10 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

## PRODUCTION STAGE ##
FROM node:15.8.0-alpine3.10 AS prod

RUN echo $GCLOUD_CREDENTIALS | base64 -d > /usr/src/conf/credentials.json

RUN export GOOGLE_APPLICATION_CREDENTIALS=/usr/src/conf/credentials.json

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]