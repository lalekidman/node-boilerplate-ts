FROM node:18-slim as BUILDER
WORKDIR /usr/app
COPY . .
RUN yarn install
CMD ["yarn","dev"]
