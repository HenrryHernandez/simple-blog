import * as z from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(4, {
    message: "Insert at least 4 characters",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
});
