# Start from a base NodeJs image
FROM node:18-alpine

WORKDIR /usr/src/foliotracker/server

# Install the dependencies for the client
COPY package*.json ./
RUN npm install

# Copy the client source code
COPY . .

# Expose port 3001
EXPOSE 3001

# Default command to serve front-end
CMD ["npm", "start"]