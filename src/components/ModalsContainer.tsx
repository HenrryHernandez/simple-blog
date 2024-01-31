"use client";

import { ReactNode, useContext } from "react";

import { BlogCardModal } from "./BlogCardModal";
import { ModalsHandlersContext } from "@/contexts";

interface Props {
  children: ReactNode;
}

export const ModalsContainer = ({ children }: Props) => {
  const { blogCardModalIsOpen } = useContext(ModalsHandlersContext);

  return (
    <>
      {blogCardModalIsOpen && <BlogCardModal />}

      {children}
    </>
  );
};
