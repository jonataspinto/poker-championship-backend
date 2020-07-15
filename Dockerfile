FROM node:12.14.1

WORKDIR /usr/poker-app-backend

ENV PATH /usr/poker-app-backend/node_modules/.bin:$PATH

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4500

CMD ["yarn", "dev:server"]

