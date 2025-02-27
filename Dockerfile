FROM node:22.9.0 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .


RUN yarn build


FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]