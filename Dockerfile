FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./build build/

EXPOSE 3030

CMD node build/src/server.mjs
