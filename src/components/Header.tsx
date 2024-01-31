import Link from "next/link";

import { Plus, Home } from "lucide-react";

import { FilterBy } from "./FilterBy";

export const Header = () => {
  return (
    <div className="w-full h-20 row-center px-8 shadow-md">
      <div className="xl:max-w-[1200px] w-full flex justify-between items-center">
        <div>
          <div className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            <Link href="/">
              <Home className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div>
          <FilterBy />
        </div>

        <div>
          <div className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300 cursor-pointer">
            <Link href="/posts/new">
              <Plus className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
