FROM node:alpine

WORKDIR /usr/app/aws-sqs

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]
