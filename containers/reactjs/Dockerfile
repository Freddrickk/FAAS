FROM node

MAINTAINER Frédéric Vachon <fredvac@gmail.com>

RUN npm install -g babel && npm install -g babel-cli

RUN mkdir /project
WORKDIR /project

ADD ./package.json .
ADD ./webpack.config.js .
ADD ./.babelrc .

RUN npm install webpack && npm install webpack-dev-server
RUN npm install react --save && npm install react-dom --save

RUN npm install --save redux
RUN npm install --save react-redux
RUN npm install --save redux-form
RUN npm install --save redux-thunk
RUN npm install --save material-ui
RUN npm install --save react-tap-event-plugin
RUN npm install --save redux-form-material-ui
RUN npm install --save redux-cookie
RUN npm install --save js-cookie

RUN npm install babel-core && npm install babel-loader && npm install babel-preset-react && npm install babel-preset-es2015 && npm install babel-preset-stage-0 && npm install --save babel-plugin-transform-class-properties
