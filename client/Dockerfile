# Start from a base NodeJs image
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

WORKDIR /usr/src/foliotracker/client

# Install the dependencies for the client
COPY package*.json ./
RUN npm install

# Copy the client source code
COPY . .

# Build the client
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Default command to serve front-end
CMD ["serve", "-s", "build"]