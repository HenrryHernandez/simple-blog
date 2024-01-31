"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDispatch } from "react-redux";
import { Home, Settings } from "lucide-react";

import { FilterBy } from "./FilterBy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks";
import { AppDispatch, useAppSelector, clearAuth } from "@/redux";

export const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);
  const { signOut } = useAuth();

  const logout = async () => {
    const res = signOut();

    if (!res) {
      // TODO: toast
      return;
    }

    dispatch(clearAuth());
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <Settings className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/posts/new">Add new post</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
