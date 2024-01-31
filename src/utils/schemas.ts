import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
});

export const SignUpSchema = z.object({
  email: z.string().trim().email({
    message: "Email is required",
  }),
  password: z.string().trim().min(4, {
    message: "Insert at least 4 characters",
  }),
  username: z.string().trim().min(1, {
    message: "Username is required",
  }),
});

export const NewPostSchema = z.object({
  title: z.string().trim().min(1, {
    message: "A title is needed",
  }),
  content: z.string().trim().min(15, {
    message: "Please, insert at least 15 characters",
  }),
});
