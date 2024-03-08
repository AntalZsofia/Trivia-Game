FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=19006

EXPOSE 19006

CMD [ "npm", "start" ]
