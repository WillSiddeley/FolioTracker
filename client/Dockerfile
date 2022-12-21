# Start from a base NodeJs image
FROM node:18-alpine AS builder

WORKDIR /usr/src/foliotracker/client

# Install the dependencies for the client
COPY package*.json ./
RUN npm install

# Copy the client source code
COPY . .

# Build the client
RUN npm run build

# Use NGINX as web server
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default NGINX static assets
RUN rm -rf *

# Copy static assets from builder
COPY --from=builder /usr/src/foliotracker/client/build .

# Expose port 3000
EXPOSE 3000

# Default command to serve front-end
CMD ["nginx", "-g", "daemon off;"]