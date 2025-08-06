"use client";
import React, { useState } from "react";

import { Certificates } from "@/components/dashboard/certificates";
import { Certification } from "@/components/dashboard/certification-status/Certifications";

const CertificationStatus: React.FC = () => {
  const [modalData, setModalData] = useState<null | Certification>(null);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Certificates</h2>
      </div>
      <Certificates />
    </>
  );
};

export default CertificationStatus;
