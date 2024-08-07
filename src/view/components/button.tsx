import { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-12 rounded-lg bg-[#9282FA] px-6 py-3 font-bold uppercase text-black transition-all hover:opacity-80",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
