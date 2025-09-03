"use client";

import { Support } from "@/app/types/support";
import { supportsData } from "@/app/types/support-data";
import SupportSearch from "@/components/support/support-search";
import SupportTable from "@/components/support/support-table";
import { useState } from "react";

export default function AdminSupportPage() {
  const [filteredSupports, setFilteredSupports] =
    useState<Support[]>(supportsData);
  return (
    <section>
      {" "}
      <p className="text-[24px] sm:text-[28px] font-semibold sm:font-bold text-[#141414] leading-[100%]">
        Support
      </p>
      <div className="flex flex-col gap-[20px] mt-[40px]">
        <SupportSearch supports={supportsData} onSearch={setFilteredSupports} />
        <SupportTable supports={filteredSupports} />
      </div>
    </section>
  );
}
