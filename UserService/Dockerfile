# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /UserService

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Install nodemon globally for auto-restart on file changes
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (adjust as necessary for each service)
EXPOSE 8001

# Define the command to run the application with nodemon
CMD ["nodemon", "index.js"]
