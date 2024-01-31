"use client";

import { useContext } from "react";

import { Filter } from "lucide-react";

import { FiltersContext } from "@/contexts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const FilterBy = () => {
  const { filterByKey, setFilterByKey, setfilterByValue } =
    useContext(FiltersContext);

  const handleCheckboxChange = (component: string) => {
    setFilterByKey(component);
  };

  return (
    <Popover>
      <PopoverTrigger className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300">
        <Filter className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="col-center gap-y-8">
          <div className="row-center gap-8">
            <div className="col-center w-12">
              <input
                type="radio"
                id="title"
                name="component"
                onChange={() => handleCheckboxChange("title")}
              />
              <label htmlFor="title">Title</label>
            </div>

            <div className="col-center w-12">
              <input
                type="radio"
                id="Content"
                name="component"
                onChange={() => handleCheckboxChange("content")}
              />
              <label htmlFor="Content">Content</label>
            </div>

            <div className="col-center w-12">
              <input
                type="radio"
                id="author"
                name="component"
                onChange={() => handleCheckboxChange("author")}
              />
              <label htmlFor="author">Author</label>
            </div>
          </div>

          {filterByKey === "title" && <div>title</div>}
          {filterByKey === "content" && <div>content</div>}
          {filterByKey === "author" && <div>author</div>}
        </div>
      </PopoverContent>
    </Popover>
  );
};
