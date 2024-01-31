# 获取依赖
FROM node:14-alpine as deps
# RUN apk add --no-cache git openssh

WORKDIR /usr/src/
USER root
COPY package.json ./
RUN npm install

# build dist
FROM deps as builder
COPY ./ ./
RUN npm run build

# nginx镜像
FROM nginx:1.17.8-alpine
COPY --from=builder /usr/src/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

