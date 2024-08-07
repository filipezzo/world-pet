import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="mx-auto flex w-full flex-col gap-8 p-6 md:w-[870px] md:p-20">
      {children}
    </main>
  );
}
