"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface FiltersContextProps {
  filterByKey: string;
  filterByValue: string | number;
  setFilterByKey: Dispatch<SetStateAction<string>>;
  setFilterByValue: Dispatch<SetStateAction<string | number>>;
}

export const FiltersContext = createContext({} as FiltersContextProps);

interface Props {
  children: ReactNode;
}

export const FiltersContextProvider = ({ children }: Props) => {
  const [filterByKey, setFilterByKey] = useState("");
  const [filterByValue, setFilterByValue] = useState<string | number>("");

  return (
    <FiltersContext.Provider
      value={{ filterByKey, filterByValue, setFilterByKey, setFilterByValue }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
