# # Use official Node.js image 
# FROM node:16-alpine

# # Set working directory
# WORKDIR /usr/src/app

# COPY package.json pnpm-lock.yaml ./

# # Install dependencies  
# RUN npm install -g pnpm  
# RUN pnpm install

# # Copy source files
# COPY . .

# # Expose port
# EXPOSE 4000  

# # Start app
# CMD ["pnpm", "start"]

# Install dependencies 
FROM node:lts-alpine AS build

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm install --prod

COPY . .
RUN pnpm build

# Copy node_modules from deps stage
FROM node:lts-alpine AS production  

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["pnpm", "start"]