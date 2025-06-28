import Facebook from "@/components/svgs/facebook.svg";
import Instagram from "@/components/svgs/instagram.svg";
import { generateKey } from "@/utils/key";
import { Link } from "@radix-ui/themes";
import Image from "next/image";
import Typography from "../common/ui/Typography";
import { footerLinks } from "./data";

export default function Footer() {
  const icons = [Facebook, Instagram];
  return (
    <footer className="py-12 md:py-24">
      <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto space-y-20">
        <div className="flex max-md:flex-col gap-x-5  lg:gap-x-10">
          <div className="md:w-1/3 max-md:mb-5 flex flex-col gap-y-4">
            <div>
              <Image
                alt=""
                src="/assets/images/logo-outline.png"
                width={150}
                height={70}
              />
            </div>
            <p className="font-medium">
              EduAiPro empowers educators and institutions with AI-driven tools
              for professional development. With personalized AI support,
              EduAiPro enhances learning and growth for both educators and
              schools.
            </p>
          </div>
          <div className="grid max-xs:gap-y-5 xs:grid-cols-3 gap-x-5 md:w-2/3">
            {footerLinks.map((footerItem) => (
              <div
                key={generateKey()}
                className="flex flex-col gap-y-2 xs:gap-y-3"
              >
                <h2 className="text-base font-semibold">{footerItem.title}</h2>
                <ul className="flex flex-col gap-y-1 xs:gap-y-2">
                  {footerItem.links.map((linkItem) => (
                    <li key={generateKey()}>
                      <Link href={linkItem.href}>
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
        <div className="flex items-center justify-between gap-5">
          <div className="w-fit flex items-center gap-3">
            {icons.map((IconItem) => (
              <div
                key={generateKey()}
                className="hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <IconItem width={24} height={24} />
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-grey-800/60"></div>
          <h4 className="whitespace-nowrap font-medium">
            Copyright &copy; {new Date().getFullYear()} EduAiPro
          </h4>
        </div>
      </div>
    </footer>
  );
}
