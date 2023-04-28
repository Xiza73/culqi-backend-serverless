import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { handler as generateTokenHandler } from "../../lambdas/generateToken";
import { contextGenerator, mockEventGenerator } from "../../utils/methods";

describe("Test on generateToken.handler", () => {
  const mockEvent: APIGatewayProxyEvent = mockEventGenerator(
    {
      card_number: "4634010639731251",
      email: "jhon.doe@gmail.com",
      expiration_month: "12",
      expiration_year: "2025",
      cvv: "123",
    },
    {
      connectionToken: "pk_test_0ae8dW2FpEAZlxlz",
    }
  );

  const mockContext: Context = contextGenerator("generateToken");

  const mockCallback = jest.fn();

  test("should return a 200 status code", async () => {
    const response = await generateTokenHandler(
      mockEvent,
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(200);
  });

  test("should return a 401 status code when token is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        headers: {},
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(401);
  });

  test("should return a 401 status code when token is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        headers: {
          Authorization: "invalid_token",
        },
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(401);
  });

  test("should return a 500 status code when card_number is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          card_number: undefined,
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when card_number is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          card_number: "invalid_card_number",
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when email is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          email: undefined,
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when email is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          email: "invalid_email",
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when expiration_month is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          expiration_month: undefined,
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when expiration_month is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          expiration_month: "invalid_expiration_month",
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when expiration_year is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          expiration_year: undefined,
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when expiration_year is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          expiration_year: "invalid_expiration_year",
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when cvv is not provided", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          cvv: undefined,
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a 500 status code when cvv is invalid", async () => {
    const response = await generateTokenHandler(
      {
        ...mockEvent,
        body: JSON.stringify({
          ...JSON.parse(mockEvent.body!),
          cvv: "invalid_cvv",
        }),
      },
      mockContext,
      mockCallback
    );

    expect(response?.statusCode).toBe(500);
  });

  test("should return a token", async () => {
    const response = await generateTokenHandler(
      mockEvent,
      mockContext,
      mockCallback
    );

    expect(JSON.parse(response?.body!)).toHaveProperty("token");
  });

  test("should return a token with 16 characters", async () => {
    const response = await generateTokenHandler(
      mockEvent,
      mockContext,
      mockCallback
    );

    expect(JSON.parse(response?.body!).token.length).toBe(16);
  });
});
