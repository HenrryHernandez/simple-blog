"use client";

import { Post } from "@/interfaces";
import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ModalsHandlersContextProps {
  blogCardModalIsOpen: boolean;
  currentPost: Post | undefined;
  closeBlogCardModal: () => void;
  openBlogCardModal: () => void;
  toggleBlogCardModal: () => void;
  setCurrentPost: Dispatch<SetStateAction<Post | undefined>>;
}

export const ModalsHandlersContext = createContext(
  {} as ModalsHandlersContextProps
);

interface Props {
  children: ReactNode;
}

export const ModalsHandlersProvider = ({ children }: Props) => {
  const [blogCardModalIsOpen, setBlogCardModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>();

  const closeBlogCardModal = () => {
    setBlogCardModalIsOpen(false);
  };

  const openBlogCardModal = () => {
    setBlogCardModalIsOpen(true);
  };

  const toggleBlogCardModal = () => {
    setBlogCardModalIsOpen(!blogCardModalIsOpen);
  };

  return (
    <ModalsHandlersContext.Provider
      value={{
        blogCardModalIsOpen,
        currentPost,
        closeBlogCardModal,
        openBlogCardModal,
        toggleBlogCardModal,
        setCurrentPost,
      }}
    >
      {children}
    </ModalsHandlersContext.Provider>
  );
};
