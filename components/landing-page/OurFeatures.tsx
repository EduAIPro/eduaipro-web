"use client";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { teacherBenefits } from "./data";

type Tab = "educators" | "institutions";
export default function OurFeatures() {
  const [activeTab, setActiveTab] = useState<Tab>("educators");
  return (
    <section className="bg-white py-20">
      <div className="space-y-5 max-md:px-5 md:max-w-[90%] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center lg:max-w-[60%] mx-auto font-medium">
          Transforming Education: Tailored Solutions for Educators and
          Institutions
        </h2>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
        >
          <TabsList className="border w-fit mx-auto rounded-full">
            <TabsTrigger value="educators" className="rounded-full">
              <h3>Educators</h3>
            </TabsTrigger>
            <TabsTrigger value="institutions" className="rounded-full">
              <h3>Institutions</h3>
            </TabsTrigger>
          </TabsList>
          {activeTab === "educators" ? <ForEducators /> : <ForInstitutions />}
        </Tabs>
      </div>
    </section>
  );
}

const GRID_SIZE = 3;

const ForEducators = () => {
  const indexes = [0, 4, 8];
  return (
    <TabsContent value="educators">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
        {teacherBenefits.map((b, i) => (
          <li
            key={i}
            className="space-y-2.5 p-5 border border-primary-150 min-h-[180px] relative"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-fit">
                <b.icon width={20} height={20} className="text-primary" />
              </div>
              <h4 className="text-primary text-base font-medium">{b.title}</h4>
            </div>
            <div>
              <p className="font-medium text-grey-650">{b.description}</p>
            </div>
            <div
              className={cn(
                "absolute z-20",
                i === 8
                  ? "-bottom-[11px] -left-[11px] max-lg:block max-xl:hidden"
                  : "hidden"
              )}
            >
              <PlusIcon className="size-5 text-primary" />
            </div>
            <div
              className={cn(
                "absolute z-20",
                indexes.includes(i) ? "-top-5 -left-[11px]" : "hidden"
              )}
            >
              <PlusIcon className="size-5 text-primary" />
            </div>
            <div
              className={cn(
                "absolute z-20",
                i <= 3 ? "-top-5 -right-[11px]" : "xl:hidden",
                i === 3
                  ? "max-sm:block max-sm:right-auto max-sm:-left-[11px] max-xl:hidden"
                  : "",
                i === 2 ? "max-lg:right-auto max-lg:-left-[11px]" : "",
                i === 1 ? "max-sm:right-auto max-sm:-left-[11px]" : ""
              )}
            >
              <PlusIcon className="size-5 text-primary" />
            </div>
            <div
              className={cn(
                "absolute z-20 -bottom-[11px] -right-[11px] border border-red-600",
                i === 0 ? "hidden" : "",
                i === 3
                  ? "lg:right-auto lg:-left-[11px] xl:left-auto xl:-right-[11px]"
                  : "",
                i === 4 ? "bg-green-700 lg:right-auto lg:-left-[11px]" : ""
              )}
            >
              <PlusIcon className="size-5 text-primary" />
            </div>
          </li>
        ))}
      </ul>
    </TabsContent>
  );
};

const ForInstitutions = () => {
  return <TabsContent value="institutions"></TabsContent>;
};
