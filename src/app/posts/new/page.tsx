"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/lib";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePost } from "@/hooks";
import { cn } from "@/lib/utils";
import { NewPostSchema } from "@/utils";

const NewPostPage = () => {
  const { isLoading, createNewPost } = usePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
  });

  const createPost = async (data: z.infer<typeof NewPostSchema>) => {
    const postCreated = await createNewPost(data);

    if (postCreated) {
      reset({ title: "", content: "" });
      // TODO: set toast
    } else {
      // TODO: set toast
    }
  };

  return (
    <div className="w-full h-full row-center">
      <Card className="w-full sm:max-w-[800px] bg-blue-100 shadow-md">
        <CardHeader>
          <div className="row-center">New Post</div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(createPost)} className="space-y-8">
            <div className="space-y-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title")}
                  className={cn("bg-white", {
                    "focus-visible:ring-red-500": errors.title,
                  })}
                />
                {errors?.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="grid gap-2 py-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  {...register("content")}
                  className={cn("h-[300px]", {
                    "focus-visible:ring-red-500": errors.content,
                  })}
                />
                {errors?.content && (
                  <p className="text-sm text-red-500">
                    {errors.content.message}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPostPage;
