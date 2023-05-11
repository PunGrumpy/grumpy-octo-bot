FROM node:18-slim
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn build
COPY . .