FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 80
EXPOSE 49153

CMD ["npm", "run", "start-docker"]