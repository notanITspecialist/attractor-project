FROM node:16-alpine3.11 AS builder

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
