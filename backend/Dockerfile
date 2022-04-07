FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install


RUN --mount=type=secret,id=DB_CONFIG,target=secrets/rds.js
RUN --mount=type=secret,id=ENCRYPT,target=secrets/encrypt.js

COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]