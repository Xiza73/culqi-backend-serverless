import { APIGatewayProxyEvent } from "aws-lambda";
import crypto from "crypto";

export const generateCrediCardToken = () => {
  const randomBytes = crypto.randomBytes(16);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const token = Array.from(randomBytes)
    .map((byte) => characters.charAt(byte % characters.length))
    .join("");
  return token;
};

export const expiresDate = (seconds?: number) =>
  new Date(new Date().getTime() + (seconds || 15) * 60 * 1000);

export const verifyToken = (token: string, secret: string) => token === secret;

export const getAuthorizationToken = (event: APIGatewayProxyEvent) =>
  event.headers.Authorization?.slice(7);
