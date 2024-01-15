FROM node:alpine

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

# Debugging: Print current working directory and list files
RUN pwd
RUN ls -la

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

# Debugging: Print contents of the copied files
COPY . .
RUN ls -la

RUN pnpm run build

# Debugging: Print contents of the build directory
RUN pwd
RUN ls -la

# Expose port
EXPOSE 4000

# Add PostgreSQL client
# RUN apk add --no-cache postgresql-client

# # Add Redis client
# RUN apk add --no-cache redis

# Debugging: Print final contents before starting the application

# Debugging lines for production stage
CMD ["pnpm", "start"]
