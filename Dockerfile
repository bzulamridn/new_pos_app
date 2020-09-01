FROM node:12.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build
