FROM node

MAINTAINER Frédéric Vachon <fredvac@gmail.com>

RUN npm install -g babel && npm install -g babel-cli

RUN mkdir /project
WORKDIR /project

ADD ./package.json .
ADD ./webpack.config.js .

RUN npm install webpack && npm install webpack-dev-server
RUN npm install react --save && npm install react-dom --save

RUN npm install babel-core && npm install babel-loader && npm install babel-preset-react && npm install babel-preset-es2015
