FROM node:18-slim as BUILDER
WORKDIR /usr/src/app
COPY . .
RUN yarn install
CMD ["yarn","dev"]
