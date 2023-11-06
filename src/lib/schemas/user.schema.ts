import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email("Not a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  email: z.string().email("Not a valid email").min(1, "Email is required"),
  password: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().optional(),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
