import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import config from "../../config";
import { verifyToken } from "./main";
import corsHeaders from "../constants/corsHeaders";

export const authMiddleware = (
  handler: APIGatewayProxyHandler
): APIGatewayProxyHandler => {
  return async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    const token = event.headers["connection-token"];

    if (!token) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    try {
      const decoded = verifyToken(token, config.JWT_TOKEN);
      if (!decoded) throw new Error();
      (event as any).user = decoded;
    } catch (error) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    return handler(event, _context, () => { })!;
  };
};
