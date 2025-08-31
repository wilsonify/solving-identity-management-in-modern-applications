# Dockerfile for hydra-server
# Multistage build: one stage for building, one stage for running

# ---- Base image ----
FROM node:20-alpine AS base
ENV APP_ID=hydra-server
ENV NODE_ENV=test
ENV OIDC_ISSUER=http://127.0.0.1:5556/dex
ENV OIDC_CLIENT_ID=example-app
ENV OIDC_REDIRECT_URI=http://localhost:32000/callback
ENV OIDC_AUDIENCE=http://hydra-server.localhost

WORKDIR /usr/src/app
COPY package*.json ./

# ---- Build stage ----
FROM base AS build
RUN npm install
COPY . .
RUN npm run compile
RUN npm test

# ---- Production runtime ----
FROM node:20-alpine AS prod
WORKDIR /usr/src/app

# Only copy necessary files
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose your app’s port (change if your app uses something else)
EXPOSE 3000

# Start in production mode
CMD ["npm", "start"]
