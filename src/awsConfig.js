import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: new AWS.Credentials(
    process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  ),
});

const docClient = new AWS.DynamoDB.DocumentClient();

export { docClient };

