import { ComponentProps, forwardRef } from "react";
import { cn } from "./cn";

interface DateProps extends ComponentProps<"input"> {
  className?: string;
  type?: string;
}

export const Date = forwardRef<HTMLInputElement, DateProps>(
  ({ className, type = "date", ...rest }, ref) => {
    return (
      <div
        className={cn(
          "flex h-12 w-44 rounded-md border border-gray-500 p-3 text-gray-500 focus-within:border-purple-500",
          className,
        )}
      >
        <input
          ref={ref}
          type={type}
          className="flex-1 bg-transparent outline-none"
          {...rest}
        />
      </div>
    );
  },
);
