import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const signUp = async (email: string, password: string) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID as string,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  return cognito.signUp(params).promise();
};

export const confirmSignUp = async (email: string, code: string) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID as string,
    Username: email,
    ConfirmationCode: code,
  };

  return cognito.confirmSignUp(params).promise();
};

export const signIn = async (email: string, password: string) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID as string,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  return cognito.initiateAuth(params).promise();
};
