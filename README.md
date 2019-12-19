# Provided 2 API's

- To push data in SQS 
- To check analytics of data

> API details has been shared in seperate file named postman.js

## How to Run App

```
npm install
npm start
```

## Run App inside Docker Container

```
docker build -t anil/aws-sqs .
docker run -p 3060:3060 anil/aws-sqs
```

Author: Anil Singh
