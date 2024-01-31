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
  filterByValue: string;
  setFilterByKey: Dispatch<SetStateAction<string>>;
  setfilterByValue: Dispatch<SetStateAction<string>>;
}

export const FiltersContext = createContext({} as FiltersContextProps);

interface Props {
  children: ReactNode;
}

export const FiltersContextProvider = ({ children }: Props) => {
  const [filterByKey, setFilterByKey] = useState("");
  const [filterByValue, setfilterByValue] = useState("");

  return (
    <FiltersContext.Provider
      value={{ filterByKey, filterByValue, setFilterByKey, setfilterByValue }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
