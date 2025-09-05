import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RetrieveSchoolDetails } from "@/types/admin/schools";
import { useState } from "react";
import { SchoolOverview } from "./overview";

export type SchoolInfoProps = {
  data: RetrieveSchoolDetails | undefined;
  isLoading: boolean;
};

export const SchoolInfo = (props: SchoolInfoProps) => {
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
        <SchoolOverview {...props} />
      </TabsContent>
    </Tabs>
  );
};

const tabsList = ["Overview", "Teachers", "Certification"];
