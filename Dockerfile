# Specify the base image
FROM node:17.0.1-alpine3.14

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the port your app is listening on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
