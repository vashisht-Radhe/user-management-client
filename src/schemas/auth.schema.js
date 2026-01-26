import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().optional(),
    email: emailSchema,
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, "Password is required"),
});

