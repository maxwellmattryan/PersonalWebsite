# Layers for base image
FROM node:12.18.3-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g @angular/cli
RUN apk add git # Needed for dependency from GitHub
RUN npm install --only=production
COPY . ./
RUN ng build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]