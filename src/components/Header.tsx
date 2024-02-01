"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Home, Settings } from "lucide-react";

import { FilterBy } from "./FilterBy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth, useOnlineStatus } from "@/hooks";
import { cn } from "@/lib/utils";
import { AppDispatch, useAppSelector, clearAuth } from "@/redux";

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { signOut } = useAuth();
  const online = useOnlineStatus();

  const logout = async () => {
    const res = signOut();

    if (!res) {
      toast.error("There was an error. Please try again.");

      return;
    }

    dispatch(clearAuth());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={!online}
        className={cn(
          "p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer",
          {
            "border-gray-100 bg-gray-100 hover:bg-gray-100 cursor-default":
              !online,
          }
        )}
      >
        <Settings
          className={cn("h-6 w-6 text-gray-400", {
            "text-gray-300": !online,
          })}
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={!online}>
          <Link href="/posts/new">Add new post</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer"
          disabled={!online}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  return (
    <div className="w-full h-20 row-center px-8 shadow-md sticky top-0 bg-white z-20">
      <div className="xl:max-w-[1200px] w-full flex justify-between items-center">
        <Link
          href="/"
          className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Go back to home page"
        >
          <Home className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </Link>

        {pathname === "/" ? (
          <div>
            <FilterBy />
          </div>
        ) : null}

        {isAuthenticated ? (
          <Menu />
        ) : pathname.includes("sign-in") ||
          pathname.includes("sign-up") ? null : (
          <Link
            href={"/sign-in"}
            className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
            aria-label="Go to sign in page"
          >
            Sign in &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
