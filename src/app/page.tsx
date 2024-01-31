"use client";

import { useContext } from "react";

import { Loader2 } from "lucide-react";

import { PostCard } from "@/components";
import { FiltersContext } from "@/contexts";

export default function Home() {
  const { isLoading, posts } = useContext(FiltersContext);

  if (isLoading) {
    return (
      <div className="w-full col-center absolute inset-0">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full col-center">
      <div className="xl:max-w-[1200px] w-full xl:bg-gray-100 xl:border-x xl:border-gray-200">
        <div className="min-h-[calc(100vh-80px)] w-full flex-wrap p-2 sm:p-8">
          <main className="w-full flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-8">
              {posts?.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
