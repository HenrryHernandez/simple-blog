"use client";

import { useContext, useEffect, useState } from "react";

import { Filter } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { FiltersContext } from "@/contexts";
import { useUser } from "@/hooks";
import { AllowedQueries, User } from "@/interfaces";
import { cn } from "@/lib/utils";

export const FilterBy = () => {
  const {
    filterByKey,
    filterByValue,
    filter,
    getAll,
    setFilterByKey,
    setFilterByValue,
  } = useContext(FiltersContext);

  const [users, setUsers] = useState<User[] | null>([]);

  const { getUsers } = useUser();

  const handleCheckboxChange = (key: AllowedQueries) => {
    setFilterByKey(key);
    setFilterByValue("");
  };

  const handleInputChange = (value: string | number) => {
    setFilterByValue(value);
  };

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  return (
    <Popover>
      <PopoverTrigger className="p-4 rounded-md border border-gray-300 bg-gray-200 hover:bg-gray-300">
        <Filter className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="col-center gap-y-8">
          <div className="row-center gap-8">
            <div className="col-center w-12 gap-y-2">
              <input
                type="radio"
                id="title"
                name="component"
                onChange={() => handleCheckboxChange("title")}
              />
              <Label htmlFor="title">Title</Label>
            </div>

            <div className="col-center w-12 gap-y-2">
              <input
                type="radio"
                id="Content"
                name="component"
                onChange={() => handleCheckboxChange("content")}
              />
              <Label htmlFor="Content">Content</Label>
            </div>

            <div className="col-center w-12 gap-y-2">
              <input
                type="radio"
                id="author"
                name="component"
                onChange={() => handleCheckboxChange("authorId")}
              />
              <Label htmlFor="author">Author</Label>
            </div>
          </div>

          <div className="bg-blue-300s w-full">
            {filterByKey === "title" && (
              <Input
                className="border-gray-300"
                onChange={(e) => handleInputChange(e.target.value)}
              />
            )}
            {filterByKey === "content" && (
              <Input
                className="border-gray-300"
                onChange={(e) => handleInputChange(e.target.value)}
              />
            )}
            {filterByKey === "authorId" && (
              <ScrollArea className="h-44 w-full rounded-md border">
                <div className="p-4">
                  {users?.map(({ id, username }) => (
                    <div
                      key={id}
                      className={cn("hover:bg-gray-100 cursor-pointer", {
                        "bg-gray-100": filterByValue === id,
                      })}
                      onClick={() => handleInputChange(id)}
                    >
                      <div className="text-sm">{username}</div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <div>
            <Button onClick={filter}>Filter</Button>
            <Button onClick={getAll} className="ml-4">
              Get all
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
