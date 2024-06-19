FROM node:20 as builder

WORKDIR /tmp
RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm build

#####################################

FROM node:20 as api

WORKDIR /usr/src/app

COPY --from=builder /tmp /usr/src/app

CMD [ "node", "--env-file=.env.production", "build/main.js" ]

EXPOSE 4012

#####################################

FROM node:20 as updater

WORKDIR /usr/src/app

COPY --from=builder /tmp /usr/src/app

CMD [ "node", "--env-file=.env.production", "build/updater.js" ]
