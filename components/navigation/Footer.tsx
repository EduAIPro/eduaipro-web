import Image from "next/image";
import React from "react";
import Typography from "../common/ui/Typography";
import { footerLinks } from "./data";
import { generateKey } from "@/utils/key";
import { Link } from "@radix-ui/themes";
import { Facebook, Instagram } from "iconsax-react";

export default function Footer() {
  const icons = [Facebook, Instagram];
  return (
    <footer>
      <div className="flex flex-col gap-y-10 sm:gap-y-14 pb-6 sm:pb-20">
        <div className="flex max-md:flex-col gap-x-5  lg:gap-x-10">
          <div className="md:w-1/3 max-md:mb-5 flex flex-col gap-y-4">
            <div>
              <Image
                alt=""
                src="/assets/images/logo-no-bg.png"
                width={150}
                height={70}
              />
            </div>
            <Typography.P>
              EduAiPro empowers educators and institutions with AI-driven tools
              for professional development. With personalized AI support,
              EduAiPro enhances learning and growth for both educators and
              schools.
            </Typography.P>
          </div>
          <div className="grid max-xs:gap-y-5 xs:grid-cols-3 gap-x-5 md:w-2/3">
            {footerLinks.map((footerItem) => (
              <div
                key={generateKey()}
                className="flex flex-col gap-y-2 xs:gap-y-3"
              >
                <Typography.H2 size="base" weight="medium">
                  {footerItem.title}
                </Typography.H2>
                <ul className="flex flex-col gap-y-1 xs:gap-y-2">
                  {footerItem.links.map((linkItem) => (
                    <li key={generateKey()}>
                      <Link href={"/hre"}>
                        <Typography.P size="small">
                          {linkItem.title}
                        </Typography.P>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-brand-800/10 rounded-xl xs:rounded-3xl p-4 xs:p-6 flex max-xs:flex-col max-xs:gap-y-4 xs:items-center justify-between">
          <div>
            <Typography.H3 weight="semibold" fontColor="large" size="base">
              Copyright &copy; {new Date().getFullYear()} EduAiPro
            </Typography.H3>
          </div>
          <div className="flex items-center gap-x-3 max-xs:hidden">
            {icons.map((IconItem) => (
              <div
                key={generateKey()}
                className="bg-brand-800/20 rounded-full p-3 displace__animation"
              >
                <IconItem className="text-brand-900" width={16} height={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
