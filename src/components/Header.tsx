import Link from "next/link";

import { Plus, Home } from "lucide-react";

import { FilterBy } from "./FilterBy";

export const Header = () => {
  return (
    <div className="w-full h-20 row-center px-8 shadow-md sticky top-0 bg-white z-20">
      <div className="xl:max-w-[1200px] w-full flex justify-between items-center">
        <Link
          href="/"
          className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <Home className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </Link>

        <div>
          <FilterBy />
        </div>

        <Link
          href="/posts/new"
          className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <Plus className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
