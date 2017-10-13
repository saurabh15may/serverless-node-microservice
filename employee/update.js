"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (
    typeof data.first_name !== "string" ||
    typeof data.last_name !== "string" ||
    typeof data.checked !== "boolean"
  ) {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the employee."
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      "#first_name": "first_name",
      "#last_name": "last_name"
    },
    ExpressionAttributeValues: {
      ":first_name": data.first_name,
      ":last_name": data.last_name,
      ":checked": data.checked,
      ":updatedAt": timestamp
    },
    UpdateExpression:
      "SET #first_name = :first_name, #last_name = :last_name, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW"
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the employee."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    callback(null, response);
  });
};
