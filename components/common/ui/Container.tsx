import Navbar from "@/components/navigation/Navbar";
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-4 bg-grey-surface max-sm:px-4 max-md:px-6 max-lg:px-[56px] max-xl:px-[64px] xl:max-w-[85%] xl:mx-auto">
        <>{children}</>
      </main>
    </>
  );
}
