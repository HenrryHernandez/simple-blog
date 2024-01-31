"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod/lib";

import { CardWrapper } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { AppDispatch, setAuth } from "@/redux";
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/utils";

const SignInPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const login = async (data: z.infer<typeof SignInSchema>) => {
    const user = await signIn(data);

    if (!user) {
      toast.error("There was an error. Please try again.");

      return;
    }

    toast.success("Log in successful");

    dispatch(setAuth({ isAuthenticated: true }));

    router.replace("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full h-full row-center px-4">
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
