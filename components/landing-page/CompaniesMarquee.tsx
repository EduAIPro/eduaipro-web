import React from "react";
import Marquee from "react-fast-marquee";
import Typography from "../common/ui/Typography";
import { schoolLogos } from "./data";
import Image from "next/image";
import { generateKey } from "@/utils/key";

export default function CompaniesMarquee() {
  return (
    <div className="md:px-8 py-3">
      <div className="px-4 md:px-10">
        <Typography.H3>
          Trusted by 50+ innovative institutions worldwide
        </Typography.H3>
      </div>
      <div>
        <div
          style={{ filter: "grayscale(1.5)" }}
          className="flex items-center gap-x-6 max-md:px-4 mt-4 overflow-x-auto no__scrollbar"
        >
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
