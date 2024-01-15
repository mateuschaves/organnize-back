# Specify the base image
FROM node:17.0.1-alpine3.14

ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

ENV NEW_RELIC_LICENSE_KEY=eu01xxd77f5bf677c8444bb7ea3ca839FFFFNRAL
ENV NEW_RELIC_APP_NAME="organnize"

# Install curl
RUN apk add --no-cache curl

# Install bash
RUN apk add --no-cache bash

# Install sudo
RUN apk add --no-cache sudo

# Install newrelic
RUN curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && sudo NEW_RELIC_API_KEY=NRAK-DP71XZ47PPWONX9HK9XGXEZA14P NEW_RELIC_ACCOUNT_ID=4319496 NEW_RELIC_REGION=EU /usr/local/bin/newrelic install

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
