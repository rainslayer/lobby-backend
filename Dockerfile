FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

ENV NODE_ENV production 

CMD ["node", "dist/src/main.js"]