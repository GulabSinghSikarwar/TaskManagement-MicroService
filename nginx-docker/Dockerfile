# Use the official Nginx image as the base image
FROM nginx:latest

# Copy custom configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static HTML file to the container
COPY ./index.html /usr/share/nginx/html/index.html

# Remove the ENTRYPOINT line to allow Nginx to start as the default command
# ENTRYPOINT ["top", "-b"] <- Remove or comment out this line
