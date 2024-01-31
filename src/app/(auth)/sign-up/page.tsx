"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/lib";

import { CardWrapper } from "@/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/utils";

const SignInPage = () => {
  const { isLoading, signUp } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const signUpUser = async (data: z.infer<typeof SignUpSchema>) => {
    const userCreated = await signUp(data);

    if (userCreated) {
      toast.success("User created successfully");

      router.push("/sign-in");
    } else {
      toast.error("There was an error. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full h-full row-center px-4">
      <CardWrapper
        headerLabel="Sign Up"
        footerLabel="Already have an account?"
        footerLink="/sign-in"
      >
        <form onSubmit={handleSubmit(signUpUser)} className="space-y-8">
          <div className="space-y-2">
            <div className="grid gap-2 py-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                className={cn({
                  "focus-visible:ring-red-500": errors.email,
                })}
                placeholder="example@gmail.com"
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2 py-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                className={cn({
                  "focus-visible:ring-red-500": errors.username,
                })}
              />
              {errors?.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
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
            className="w-full bg-gray-600"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </CardWrapper>
    </div>
  );
};

export default SignInPage;
