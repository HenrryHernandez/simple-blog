import { useState } from "react";

import { z } from "zod";

import blogApi from "@/lib/blogApi";
import { SignInSchema, SignUpSchema } from "@/utils";
import { StandardResponse, User } from "@/interfaces";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (signInData: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.post<StandardResponse<{ user: User }>>(
        "/auth/sign-in",
        signInData
      );

      return data.data?.user;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (signUpData: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true);

    try {
      await blogApi.post<StandardResponse<User>>("/auth/sign-up", signUpData);

      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await blogApi.post<StandardResponse>("/auth/sign-out");

      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async () => {
    setIsLoading(true);

    try {
      await blogApi.get<StandardResponse<User>>("/auth/validate-token");

      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signIn, signUp, signOut, validateToken };
};
