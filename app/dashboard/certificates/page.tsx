"use client";
import React, { useState } from "react";

import { Certificates } from "@/components/dashboard/certificates";
import { Certification } from "@/components/dashboard/certification-status/Certifications";

const CertificationStatus: React.FC = () => {
  const [modalData, setModalData] = useState<null | Certification>(null);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Certificates</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track and download the certificates you{"'"}ve earned.
        </p>
      </div>
      <Certificates />
    </>
  );
};

export default CertificationStatus;
