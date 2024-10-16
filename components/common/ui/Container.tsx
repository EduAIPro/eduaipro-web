import Navbar from "@/components/navigation/Navbar";
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-4 bg-grey-surface max-w-[85%] mx-auto">
        <>{children}</>
      </main>
    </>
  );
}
