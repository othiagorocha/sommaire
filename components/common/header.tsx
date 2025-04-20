"use client";
import { FileTextIcon } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <nav className="container flex items-center justify-between lg:px-8 py-4 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink
          className="flex items-center group gap-1 lg:gap-2 shrink-0"
          href="/"
        >
          <FileTextIcon className="size-5 lg:size-8 text-gray-900 group-hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Sommaire
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};
