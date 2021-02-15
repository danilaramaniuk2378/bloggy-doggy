FROM node:12.16.2
WORKDIR '/app'
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start:prod"]
