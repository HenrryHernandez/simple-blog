import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

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

export const NewPostSchema = z.object({
  title: z.string().min(1, {
    message: "A title is needed",
  }),
  content: z.string().min(15, {
    message: "Please, insert at least 15 characters",
  }),
});
