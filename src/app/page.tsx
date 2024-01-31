"use client";

import { useEffect, useState } from "react";

import { PostCard } from "@/components";
import { usePost } from "@/hooks";
import { Post } from "@/interfaces";

export default function Home() {
  const { isLoading, getPosts } = usePost();

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPosts().then((res) => {
      console.log(res);
      setPosts(res?.posts);
    });
  }, []);

  return (
    <div className="w-full col-center">
      <div className="xl:max-w-[1200px] w-full xl:bg-gray-100 xl:border-x xl:border-gray-200">
        <div className="min-h-[calc(100vh-80px)] w-full flex-wrap p-2 sm:p-8">
          <main className="w-full flex flex-col items-center">
            {/* <div>filter</div> */}

            <div className="flex flex-wrap justify-center gap-8">
              {posts?.map(
                ({
                  id,
                  title,
                  content,
                  createdAt,
                  author: { username, email },
                }) => (
                  <PostCard
                    key={id}
                    {...{
                      title,
                      content,
                      username,
                      createdAt,
                    }}
                  />
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
