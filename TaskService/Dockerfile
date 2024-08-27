# Dockerfile for TaskService

# Use the Node.js 16 LTS base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /TaskService

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 8002 (or whatever port the service runs on)
EXPOSE 8002

# Start the service
CMD ["npm", "start"]
