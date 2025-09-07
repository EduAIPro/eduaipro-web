import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RetrieveSchoolDetails } from "@/types/admin/schools";
import { useState } from "react";
import { CertificatesTable } from "./certificates-table";
import { SchoolOverview } from "./overview";
import { SchoolTeachersTable } from "./teachers-table";

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
      <TabsContent value="teachers">
        <SchoolTeachersTable schoolId={props?.data?.id} />
      </TabsContent>
      <TabsContent value="certification">
        <CertificatesTable schoolId={props?.data?.id} />
      </TabsContent>
    </Tabs>
  );
};

const tabsList = ["Overview", "Teachers", "Certification"];
