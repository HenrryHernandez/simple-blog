"use client";

import { ReactNode } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Props {
  children: ReactNode;
  headerLabel: string;
  footerLabel: string;
  footerLink: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  footerLabel,
  footerLink,
}: Props) => {
  return (
    <Card className="w-[400px] bg-blue-100 shadow-md">
      <CardHeader>
        <div className="row-center">{headerLabel}</div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="w-full col-center">
          <Link className="col-center text-blue-400" href={footerLink}>
            {footerLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
