# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install
RUN cd server && npm install

EXPOSE 3000

# Backend API
EXPOSE 3001

# Define the entry point for the container
CMD ["npm", "start", "cd server && npm start"]