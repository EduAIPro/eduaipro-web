import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SchoolOverview } from "./overview";

export const SchoolInfo = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)}>
      <TabsList>
        {tabsList.map((t) => (
          <TabsTrigger key={t} value={t.toLowerCase()}>
            <p>{t}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview">
        <SchoolOverview />
      </TabsContent>
    </Tabs>
  );
};

const tabsList = ["Overview", "Teachers", "Certification"];
