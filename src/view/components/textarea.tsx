import { forwardRef, useId } from "react";
import { cn } from "./cn";

export const Textarea = forwardRef<HTMLTextAreaElement>(({ ...props }, ref) => {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="select-none font-bold">
        Descrição do serviço
      </label>
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "flex w-full resize-none items-center gap-2 rounded-lg border border-[#3E3C41] bg-transparent p-3 outline-none focus-within:border-[#9282FA]",
        )}
        placeholder="Banho e tosa"
        {...props}
      />
    </div>
  );
});
