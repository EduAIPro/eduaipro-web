import React, { ReactNode } from "react";

export default function GridBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-xl">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundImage: `linear-gradient(#bdd1ff 1px, transparent 1px),
                               linear-gradient(90deg, #bdd1ff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      {children}
    </div>
  );
}
