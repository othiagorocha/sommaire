"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NavLink = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500", className, isActive && "text-rose-500")}>
      {children}
    </Link>
  );
};
