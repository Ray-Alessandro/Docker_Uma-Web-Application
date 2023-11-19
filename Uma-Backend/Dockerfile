FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app

# Set the working directory to /app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
RUN npm install 

COPY . .

# Bind to all network interfaces so that it can be mapped to the host OS
EXPOSE 3000

CMD [ "npm", "start"]