"use client";

import { ReactNode, useEffect } from "react";

import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks";
import { AppDispatch, setAuth } from "@/redux";

interface Props {
  children: ReactNode;
}

export const Initializer = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken().then((isValid) =>
      dispatch(setAuth({ isAuthenticated: isValid }))
    );
  }, []);

  return <div>{children}</div>;
};
