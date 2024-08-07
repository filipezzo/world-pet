import { ComponentProps, forwardRef, ReactNode, useId } from "react";
import { cn } from "./cn";

interface InputLabelProps extends ComponentProps<"input"> {
  label: string;
  icon: ReactNode;
}

export const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  ({ label, icon, ...rest }, ref) => {
    const id = useId();
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="select-none font-bold">
          {label}
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-[#3E3C41] p-3 focus-within:border-[#9282FA]">
          {icon}
          <input
            ref={ref}
            id={id}
            className={cn("flex-1 bg-transparent text-gray-400 outline-none")}
            {...rest}
          />
        </div>
      </div>
    );
  },
);
