FROM node:18-alpine
COPY . /home/node/app/
WORKDIR /home/node/app/
RUN npm install

EXPOSE 8001

CMD ["node", "/home/node/app/index.js"]