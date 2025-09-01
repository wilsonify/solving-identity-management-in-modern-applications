# Dockerfile for hydra-client
# Multistage build: one stage for building, one stage for running

# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Build stage
FROM base AS build
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy build output to nginx html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy default nginx config (optional, can customize later)
# If you have routes handled by React Router, you’ll want a custom config
# so all paths redirect to index.html
COPY ./etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:80/manifest.json || exit 1



