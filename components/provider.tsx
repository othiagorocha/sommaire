"use client";
import React from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div>{children}</div>;
};
