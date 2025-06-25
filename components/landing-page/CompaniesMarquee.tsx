import { generateKey } from "@/utils/key";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { schoolLogos } from "./data";

export default function CompaniesMarquee() {
  return (
    <div className="space-y-1">
      <div className="w-full h-0.5 bg-gradient-to-r from-[#fff] via-[#141414] to-[#fff]"></div>
      <Marquee className="flex gap-x-4">
        {schoolLogos.map((link) => (
          <Image
            key={generateKey()}
            src={link}
            width={130}
            height={50}
            className="px-10"
            alt=""
          />
        ))}
      </Marquee>
      <div className="w-full h-0.5 bg-gradient-to-r from-[#fff] via-[#141414] to-[#fff]"></div>
    </div>
  );
}
