"use client";

import { useAppSelector } from "@/redux";
import { redirect } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
