import { Dog } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2E2C30] px-5 py-3 md:mt-6 md:w-[720px]">
      <Dog />
      <span className="uppercase">mundo pet</span>
    </header>
  );
}
