"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Tab = "educators" | "institutions";
export default function OurFeatures() {
  const [activeTab, setActiveTab] = useState<Tab>("educators");
  return (
    <section className="bg-white py-20">
      <div className="space-y-12 max-w-[90%] mx-auto">
        <div className="max-w-[60%] mx-auto space-y-5">
          <h2 className="text-4xl text-center font-medium">
            Transforming Education: Tailored Solutions for Educators and
            Institutions
          </h2>
          <Tabs onValueChange={(v) => setActiveTab(v as Tab)}>
            <TabsList>
              <TabsTrigger value="educators">
                <h3>Educators</h3>
              </TabsTrigger>
              <TabsTrigger value="institutions">
                <h3>Institutions</h3>
              </TabsTrigger>
            </TabsList>
            {activeTab === "educators" ? <ForEducators /> : <ForInstitutions />}
          </Tabs>
        </div>
        <div></div>
      </div>
    </section>
  );
}

const GRID_SIZE = 3;

const ForEducators = () => {
  return (
    <TabsContent value="educators">
      <div className="relative w-full max-w-3xl mx-auto my-12">
        {/* Grid */}
        <div
          className={`
          grid grid-cols-${GRID_SIZE} grid-rows-${GRID_SIZE}
          border-2 border-gray-300
          relative
        `}
          style={{ aspectRatio: "1 / 1" }}
        >
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => (
            <div
              key={i}
              className={`
              border-gray-300
              ${i < GRID_SIZE * (GRID_SIZE - 1) ? "border-b-2" : ""}
              ${(i + 1) % GRID_SIZE !== 0 ? "border-r-2" : ""}
              relative
              flex items-center justify-center
              bg-white
            `}
            >
              {/* Content of each cell (optional) */}
            </div>
          ))}
        </div>

        {/* Pluses at intersections */}
        {/* Horizontal and vertical lines meet at (row, col) except at the far right and bottom edges */}
        {Array.from({ length: GRID_SIZE + 1 }).map((_, row) =>
          Array.from({ length: GRID_SIZE + 1 }).map((_, col) => {
            // Don't render plus at the outermost bottom-right corner
            if (row === GRID_SIZE && col === GRID_SIZE) return null;
            return (
              <span
                key={`plus-${row}-${col}`}
                className="absolute z-10 text-gray-400 text-xl font-bold pointer-events-none select-none"
                style={{
                  top: `calc(${(row / GRID_SIZE) * 100}% - 0.5em)`,
                  left: `calc(${(col / GRID_SIZE) * 100}% - 0.5em)`,
                }}
              >
                +
              </span>
            );
          })
        )}
      </div>
      {/* <div className="grid grid-cols-4">

      </div> */}
    </TabsContent>
  );
};

const ForInstitutions = () => {
  return <TabsContent value="institutions"></TabsContent>;
};
