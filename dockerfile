FROM node:8.16.0-jessie

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon

COPY package.json package.json
COPY client/package.json client/package.json

RUN npm install
RUN npm run install:client

COPY . .

LABEL maintainer="Varis Darasirikul"

VOLUME ["/app/public"]

# CMD npm rebuild node-sass --prefix client && npm run dev
CMD npm start