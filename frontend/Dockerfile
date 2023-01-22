FROM node:18.13.0-bullseye

ARG WORKDIR="/app"

WORKDIR ${WORKDIR}

COPY --chown=node:node ./package*.json ./

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
