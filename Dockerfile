FROM node:18-slim
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
RUN yarn cache clean --force
ENV NODE_ENV="production"
COPY . .