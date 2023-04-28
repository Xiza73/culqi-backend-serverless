import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { handler as getCreditCardHandler } from "../../lambdas/getCreditCard";
import { contextGenerator, mockEventGenerator } from "../../utils/methods";

describe("Test on getCreditCard.handler", () => {
  const mockEvent: APIGatewayProxyEvent = mockEventGenerator(
    {},
    {
      authorization: "Bearer 8wbFEcHikWqj7IBW", // this token expires in 1 year, only for testing
      connectionToken: "pk_test_0ae8dW2FpEAZlxlz",
    }
  );

  const mockContext: Context = contextGenerator("getCreditCard");

  const mockCallback = jest.fn();

  test("should return a 200 status code", async () => {
    const response = await getCreditCardHandler(
      mockEvent,
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(200);
  });

  test("should return card_number, expiration_month, expiration_year and email", async () => {
    const response = await getCreditCardHandler(
      mockEvent,
      mockContext,
      mockCallback
    );

    expect(response?.body).toContain("card_number");
    expect(response?.body).toContain("expiration_month");
    expect(response?.body).toContain("expiration_year");
    expect(response?.body).toContain("email");
  });

  test("should return a 400 status code when token is not provided", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          Authorization: "",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(400);
  });

  test("should return a 500 status code when token is invalid", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          Authorization: "Bearer invalid_token",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return invalid token message when token is invalid", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          Authorization: "Bearer invalid_token",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.body).toContain("Invalid token");
  });

  test("should return a 500 status code when token is expired", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          Authorization: "Bearer G6D727ZcDAEX21vo",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return expired token message when token is expired", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          Authorization: "Bearer G6D727ZcDAEX21vo",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.body).toContain("Expired token");
  });

  test("should return a 401 status code when connection token is not provided", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          "connection-token": "",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(401);
  });

  test("should return a 401 status code when connection token is invalid", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          "connection-token": "invalid_token",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(401);
  });

  test("should return a unauthorized message when connection token is invalid", async () => {
    const response = await getCreditCardHandler(
      {
        ...mockEvent,
        headers: {
          ...mockEvent.headers,
          "connection-token": "invalid_token",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.body).toContain("Unauthorized");
  });
});
