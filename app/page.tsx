"use client";

import { BgGradient } from "@/components/common/bg-gradient";
import { HeroSection } from "@/components/home/hero-section";
import { DemoSection } from "@/components/home/demo-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { PricingSection } from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div className='relative w-full'>
      <BgGradient />
      <div className='flex flex-col'>
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
      </div>
      {/* <CTASection /> */}
    </div>
  );
}
