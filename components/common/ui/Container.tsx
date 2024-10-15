import Navbar from "@/components/navigation/Navbar";
import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <main className="px-4 bg-[#f1f1f1]/20">
      <Navbar />
      <>{children}</>
    </main>
  );
}
