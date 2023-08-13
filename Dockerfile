FROM node:18-alpine3.16 AS base

ENV DIR /project
WORKDIR $DIR
ARG NPM_TOKEN

FROM base AS dev

ENV NODE_ENV=development

COPY package*.json $DIR

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $DIR/.npmrc && \
    npm install && \
    rm -f .npmrc

COPY tsconfig*.json $DIR
COPY src $DIR/src

EXPOSE $PORT
CMD ["npm", "run", "start:dev"]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json $DIR
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $DIR/.npmrc && \
    npm ci && \
    rm -f .npmrc

COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN npm run build && \
    npm prune --production

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
