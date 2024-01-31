"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Plus, Home } from "lucide-react";

import { FilterBy } from "./FilterBy";
import { useAppSelector } from "@/redux";

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  return (
    <div className="w-full h-20 row-center px-8 shadow-md sticky top-0 bg-white z-20">
      <div className="xl:max-w-[1200px] w-full flex justify-between items-center">
        <Link
          href="/"
          className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <Home className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </Link>

        {pathname === "/" ? (
          <div>
            <FilterBy />
          </div>
        ) : null}

        {isAuthenticated ? (
          <Link
            href="/posts/new"
            className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            <Plus className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href={"/sign-in"}
            className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Sign in &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
