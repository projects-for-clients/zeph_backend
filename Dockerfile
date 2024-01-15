# FROM node:alpine AS production

# ARG NODE_ENV=development
# ENV NODE_ENV=$NODE_ENV

# WORKDIR /usr/src/app

# COPY .env .env

# COPY package.json pnpm-lock.yaml ./

# RUN npm install -g pnpm

# RUN pnpm install

# COPY . .

# RUN pnpm run build

# # Expose port
# EXPOSE 4000

# CMD ["pnpm", "start"]


# Development Stage
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy only necessary files for npm install to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies for development
RUN pnpm install

# Copy the entire project for development
COPY . .

# Build your application for development
RUN pnpm run build

# Production Stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

# Copy only necessary files for npm install to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy the .env file for both development and production
COPY .env .env

# Copy the application files

# Copy the built files from the development stage
COPY --from=development /usr/src/app/dist ./dist

COPY . .

# Expose the application port
EXPOSE 4000

# Set a default command for production
CMD ["node", "dist/src/main"]








