"use client";
import React, { useState } from "react";

import Certifications, {
  Certification,
} from "@/components/dashboard/certification-status/Certifications";
import ProgressOverview from "@/components/dashboard/certification-status/ProgressOverview";
import NextAccreditation from "@/components/dashboard/certification-status/NextAccreditation";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";

const CertificationStatus: React.FC = () => {
  const [modalData, setModalData] = useState<null | Certification>(null);

  return (
    <div className="!h-full">
      <DashboardHeaderAndSubtitle
        title="Certification status"
        subtitle="Track your progress, accreditations, and certifications."
      />

      <main className="grid grid-cols-3 mt-6 gap-4 flex-1">
        <section className="col-span-2">
          <div>
            <ProgressOverview />
          </div>
          <div>
            <NextAccreditation />
          </div>
          {/* <Accreditations /> */}
        </section>

        <section className="col-span-1 lg:border-l border-grey-3 px-3 h-full">
          {/* <Certifications setModalData={setModalData} /> */}
        </section>
      </main>

      {modalData && <div>{/* Modal Component */}</div>}
    </div>
  );
};

export default CertificationStatus;
