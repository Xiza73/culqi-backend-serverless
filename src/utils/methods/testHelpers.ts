import { APIGatewayProxyEvent, Context } from "aws-lambda";

export const mockEventGenerator = (
  data: any,
  moreData?: {
    authorization?: string;
    connectionToken?: string;
  }
): APIGatewayProxyEvent => ({
  body: JSON.stringify(data),
  httpMethod: "",
  isBase64Encoded: false,
  path: "",
  pathParameters: null,
  queryStringParameters: {},
  multiValueQueryStringParameters: null,
  stageVariables: null,
  resource: "",
  headers: {
    ...(moreData?.connectionToken && {
      "connection-token": moreData.connectionToken,
    }),
    ...(moreData?.authorization && { Authorization: moreData.authorization }),
  },
  multiValueHeaders: {},
  requestContext: {
    accountId: "",
    apiId: "",
    authorizer: null,
    protocol: "",
    httpMethod: "",
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: "",
      user: null,
      userAgent: null,
      userArn: null,
      clientCert: null,
    },
    path: "",
    stage: "",
    requestId: "",
    requestTimeEpoch: 0,
    resourceId: "",
    resourcePath: "",
  },
});

export const contextGenerator = (functionName: string): Context => ({
  functionName,
  callbackWaitsForEmptyEventLoop: false,
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: function (): number {
    throw new Error("Function not implemented.");
  },
  done: function (_?: Error | undefined, __?: any): void {
    throw new Error("Function not implemented.");
  },
  fail: function (_: string | Error): void {
    throw new Error("Function not implemented.");
  },
  succeed: function (_: any): void {
    throw new Error("Function not implemented.");
  },
});
