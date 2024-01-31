"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/lib";

import { CardWrapper } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/utils";

const SignInPage = () => {
  const { isLoading, signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const login = async (data: z.infer<typeof SignInSchema>) => {
    await signIn(data);
  };

  return (
    <div className="w-full h-full row-center">
      <CardWrapper
        headerLabel="Sign In"
        footerLabel="Don't have an account yet?"
        footerLink="/sign-up"
      >
        <form onSubmit={handleSubmit(login)} className="space-y-8">
          <div className="space-y-2">
            <div className="grid gap-2 py-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                className={cn("bg-white", {
                  "focus-visible:ring-red-500": errors.email,
                })}
                placeholder="example@gmail.com"
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2 py-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                className={cn({
                  "focus-visible:ring-red-500": errors.password,
                })}
              />
              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-300"
          >
            Submit
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
};

export default SignInPage;
