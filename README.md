# serverless-node-api

##### Please find the steps to build and deploy the microservice using Serverless.
###### It is assumed that nodeJS is installed and npm commands can be executed via command-line

#### Install serverless
>npm install -g serverless

#### configure AWS profile (An IAM user linked to my personal AWS account)
>serverless config credentials --provider aws --key XXXXXXXX --secret XXXXXXXXXX

#### Deploy to AWS Lambda (Will create an API link vi API Gateway)
>serverless deploy
```sh
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (5.49 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....................................................................................................
Serverless: Stack update finished...
Service Information
service: serverless-node-api
stage: dev
region: us-east-1
stack: serverless-node-api-dev
api keys:
  None
endpoints:
  POST - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/employees/create
  GET - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/employees
  GET - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/employees/{id}
  PUT - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/employees/{id}/update
  DELETE - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/employees/{id}/delete
functions:
  create: serverless-node-api-dev-create
  list: serverless-node-api-dev-list
  get: serverless-node-api-dev-get
  update: serverless-node-api-dev-update
  delete: serverless-node-api-dev-delete
```

#### Test the created lambda function on local
>serverless invoke --f create --log --path employee.json

>serverless invoke --f list --log

>serverless invoke --f get --log {"pathParameters":{"id":"1"}}

>serverless invoke --f update --log --path employee.json

>serverless invoke --f delete --log {"pathParameters":{"id":"1"}}



