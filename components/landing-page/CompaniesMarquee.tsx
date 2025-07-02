import { generateKey } from "@/utils/key";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { schoolLogos } from "./data";

export default function CompaniesMarquee() {
  return (
    <div className="space-y-1">
      <div className="w-full h-0.5 bg-gradient-to-r from-[#fff] via-[#141414] to-[#fff]"></div>
      <div className="h-24 w-full py-2">
        <Marquee className="flex gap-x-4 overflow-hidden">
          {schoolLogos.map((link) => (
            <Image
              key={generateKey()}
              src={link}
              width={130}
              height={50}
              className="px-7"
              alt=""
            />
          ))}
        </Marquee>
      </div>
      <div className="w-full h-0.5 bg-gradient-to-r from-[#fff] via-[#141414] to-[#fff]"></div>
    </div>
  );
}
