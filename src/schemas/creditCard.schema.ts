import { z } from "zod";
import luhn from "luhn";

export const creditCardSchema = z.object({
  email: z
    .string()
    .nonempty()
    .email()
    .min(5)
    .max(100)
    .regex(/@(gmail|yahoo|hotmail)\.com$/),
  card_number: z
    .string()
    .nonempty()
    .min(13)
    .max(16)
    .regex(/^[0-9]+$/)
    .refine(
      (value) => {
        return luhn.validate(value);
      },
      { message: "Invalid card number" }
    ),
  expiration_month: z
    .string()
    .nonempty()
    .min(1)
    .max(2)
    .regex(/^[0-9]+$/),
  expiration_year: z
    .string()
    .nonempty()
    .min(4)
    .max(4)
    .regex(/^[0-9]+$/),
  cvv: z
    .string()
    .nonempty()
    .min(3)
    .max(4)
    .regex(/^[0-9]+$/),
});
