"use client";

import { usePost } from "@/hooks";
import { AllowedQueries, Post } from "@/interfaces";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface FiltersContextProps {
  posts: Post[] | undefined;
  filterByKey: AllowedQueries | undefined;
  filterByValue: string | number;
  filter: () => void;
  getAll: () => void;
  setFilterByKey: Dispatch<SetStateAction<AllowedQueries | undefined>>;
  setFilterByValue: Dispatch<SetStateAction<string | number>>;
}

export const FiltersContext = createContext({} as FiltersContextProps);

interface Props {
  children: ReactNode;
}

export const FiltersContextProvider = ({ children }: Props) => {
  const [filterByKey, setFilterByKey] = useState<AllowedQueries>();
  const [filterByValue, setFilterByValue] = useState<string | number>("");
  const [posts, setPosts] = useState<Post[]>();

  const { isLoading, getPosts } = usePost();

  const filter = () => {
    getPosts({ key: filterByKey, value: filterByValue }).then((res) => {
      setPosts(res?.posts);
    });
  };

  const getAll = () => {
    getPosts().then((res) => {
      setPosts(res?.posts);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        posts,
        filterByKey,
        filterByValue,
        filter,
        getAll,
        setFilterByKey,
        setFilterByValue,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
