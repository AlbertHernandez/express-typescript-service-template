FROM node:18-alpine3.16 AS base

RUN apk update && \
    apk add --no-cache dumb-init

ENV DIR /project

WORKDIR $DIR

COPY package*.json $DIR

FROM base AS dev

ENV NODE_ENV=development
RUN --mount=type=cache,target=$DIR/.npm \
  npm set cache $DIR/.npm && \
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $DIR/.npmrc && \
  npm install && \
  npm cache clean --force && \
  rm -f .npmrc

COPY tsconfig*.json $DIR
COPY src $DIR/src
COPY .env $DIR

EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]

FROM base as build

ARG BUILD_NODE_ENV=production

RUN --mount=type=cache,target=$DIR/.npm \
  npm set cache $DIR/.npm && \
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $DIR/.npmrc && \
  npm ci && \
  npm cache clean --force

COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN npm run build

RUN --mount=type=cache,target=$DIR/.npm \
  npm set cache $DIR/.npm && \
  npm ci --omit=dev && \
  npm cache clean --force && \
  rm -f .npmrc

FROM base AS production

ENV NODE_ENV=production
ENV USER=node
ENV GROUP=node

USER $USER

COPY --chown=$USER:$GROUP --from=build $DIR/node_modules $DIR/node_modules
COPY --chown=$USER:$GROUP --from=build $DIR/dist $DIR/dist

EXPOSE ${PORT}

CMD ["dumb-init", "node", "dist/main.js"]
