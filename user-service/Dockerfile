FROM node:18-alpine
WORKDIR /home/node/app/

# Copy package management files
COPY package*.json ./

# installs packages and their dependencies
RUN npm ci

# Copy over project files
COPY . .

EXPOSE 8000

CMD ["node", "/home/node/app/index.js"]