FROM node:18.16.0-alpine AS build-env
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production
ENV NODE_ENV=production
COPY --from=build-env /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
HEALTHCHECK --interval=1m --timeout=5s \
  CMD curl --head --fail http://localhost:80/ || exit 1
