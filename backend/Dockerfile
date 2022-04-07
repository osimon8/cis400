FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install


RUN --mount=type=secret,id=DB_CONFIG,dst=secrets/rds.js
RUN --mount=type=secret,id=ENCRYPT,dst=secrets/encrypt.js

COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]