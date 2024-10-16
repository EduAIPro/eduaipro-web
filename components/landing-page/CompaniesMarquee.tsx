import React from "react";
import Marquee from "react-fast-marquee";
import Typography from "../common/ui/Typography";
import { schoolLogos } from "./data";
import Image from "next/image";
import { generateKey } from "@/utils/key";

export default function CompaniesMarquee() {
  return (
    <div className="px-8 py-3">
      <div className="px-10">
        <Typography.H3>
          Trusted by 50+ innovative institutions worldwide
        </Typography.H3>
      </div>
      <div>
        <div className="flex items-center gap-x-12 mt-4">
          {schoolLogos.map((link) => (
            <Image
              key={generateKey()}
              src={link}
              width={200}
              height={50}
              className="!h-[80px] px-8"
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}
