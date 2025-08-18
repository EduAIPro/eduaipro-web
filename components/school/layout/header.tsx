"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmLogoutModal } from "./logout-confirmation";
import { NavItems } from "./nav";
import { HeaderNotifications } from "./notifications";

type SchoolLayoutHeaderProps = {};

export const SchoolLayoutHeader = ({}: SchoolLayoutHeaderProps) => {
  const path = usePathname();
  const router = useRouter();
  return (
    <header className="bg-white flex items-center justify-between p-5 fixed top-0 w-full inset-x-0 z-50">
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/assets/images/logo-outline.png"
            width={120}
            height={70}
            alt=""
          />
        </Link>
      </div>
      <ul className="flex-shrink-0 gap-3 flex items-center justify-center max-md:fixed max-md:bottom-0 max-md:w-full max-md:h-20 bg-white max-md:border-t max-md:inset-x-0 max-md:px-5 max-sm:overflow-x-scroll">
        {NavItems.map((i) => {
          const Icon = path === i.url ? i.activeIcon : i.icon;
          return (
            <Button
              variant="ghost"
              key={i.name}
              onClick={() => router.push(i.url)}
              className={cn(
                "shadow-none max-md:flex-shrink-0 max-md:w-1/4 max-sm:flex-col max-sm:h-12 max-sm:gap-1",
                path === i.url ? "border border-[#AFCAFC] !bg-[#EEF5FF]" : ""
              )}
            >
              <div className="flex-shrink-0">
                <Icon width={20} height={20} />
              </div>
              <h2
                className={cn(
                  path === i.url ? "text-[#0043BE]" : "text-grey-500"
                )}
              >
                {i.name}
              </h2>
            </Button>
          );
        })}
      </ul>
      <div className="flex-shrink-0 flex items-center gap-4">
        <HeaderNotifications />
        <ConfirmLogoutModal />
      </div>
    </header>
  );
};
