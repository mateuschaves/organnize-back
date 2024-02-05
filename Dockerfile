FROM --platform=linux/amd64 node:18-bullseye-slim

RUN apt-get update

RUN apt-get install -y curl

RUN apt-get install bash

RUN apt-get install sudo

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

RUN npx prisma generate

RUN npx prisma db push

EXPOSE 8080

CMD ["npm", "start"]
