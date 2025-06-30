import Navbar from "@/components/navigation/Navbar";
import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <>{children}</>
      </main>
    </>
  );
}
