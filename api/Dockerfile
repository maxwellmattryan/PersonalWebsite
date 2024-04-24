## BUILD STAGE ##
FROM node:18.20.2-alpine3.18 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

## PRODUCTION STAGE ##
FROM node:18.20.2-alpine3.18 AS prod

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production=true

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["yarn", "start"]
