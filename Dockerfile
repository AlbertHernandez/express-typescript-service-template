FROM node:18-alpine3.16 AS base

ENV DIR /project
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development
COPY package*.json $DIR

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

FROM base AS build

ARG BUILD_NODE_ENV=production

RUN apk update && \
    apk add --no-cache dumb-init

COPY package*.json $DIR

RUN --mount=type=cache,target=$DIR/.npm \
  npm set cache $DIR/.npm && \
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $DIR/.npmrc && \
  npm ci && \
  npm cache clean --force && \
  rm -f .npmrc

COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN npm run build && \
  npm prune --production && \
  wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && \
  node-prune

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

USER $USER

EXPOSE ${PORT}

CMD ["dumb-init", "node", "dist/main.js"]
