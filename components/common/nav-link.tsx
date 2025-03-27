import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NavLink = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500", className)}>
      {children}
    </Link>
  );
};
