FROM node:18.11.0-alpine3.16

WORKDIR /app
COPY . .
RUN npm ci

CMD node /app/src/start.js
