import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import { Badge } from "../ui/badge";

interface HeroSectionProps {}

export const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section className='relative mx-auto flex flex-col z-0 items-center justify-center'>
      <div className=''>
        <div className='flex'>
          <div className='relative p-px overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group'>
            <Badge
              variant={"secondary"}
              className='relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-200 transition-colors duration-200'>
              <Sparkle className='h-6 w-6 mr-2 text-rose-600 animate-pulse' />
              <p className='text-base text-rose-600'>Powered by AI</p>
            </Badge>
          </div>
        </div>
        <h1>Transform PDFs into concise summaries</h1>
        <h2>Get a beautiful summary reel of the document in seconds.</h2>
        <Button>Try Sommaire</Button>
      </div>
    </section>
  );
};
