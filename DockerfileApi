FROM node:20

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 4012

CMD [ "node", "--env-file=.env.production", "build/main.js" ]
