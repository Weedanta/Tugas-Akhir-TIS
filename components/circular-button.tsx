"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface Props extends ComponentProps<typeof Button> {
  logo: React.ReactNode;
  className?: string;
}

export function CircularButton({
  logo,
  className = "",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className={`rounded-full aspect-square p-0 ${className}`}
      {...props}
    >
      {logo}
    </Button>
  );
}
