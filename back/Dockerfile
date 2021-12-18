FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/server

COPY ./package.json ./
COPY ./server.js ./
COPY src/server_lib.js ./
COPY src/server_lib.js ./

RUN npm install

ENTRYPOINT ["node", "server.js"]
#Для сборки: docker build -t pelmeni/admin-back:0.1.1 .