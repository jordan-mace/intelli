FROM node:18.0.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY src src

RUN npm i
RUN npm run build

FROM node:18.0.0-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/dist . 
RUN npm i

USER node

CMD [ "node", "index.js" ] 