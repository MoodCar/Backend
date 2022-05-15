FROM node:16.14.0

MAINTAINER Myungkwan

COPY package*.json .

ENV NODE_ENV development

RUN npm install

EXPOSE 3000

CMD["npm","start"]

COPY . .