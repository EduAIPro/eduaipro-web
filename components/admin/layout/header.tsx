"use client";

import { ConfirmLogoutModal } from "@/components/dashboard/common";
import { HeaderNotifications } from "@/components/school/layout/notifications";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminNavItems } from "./nav";

export const AdminLayoutHeader = () => {
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
        {AdminNavItems.map((i) => {
          const isActive = path === i.url;
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
                <i.icon
                  className={cn(
                    isActive ? "text-primary-400" : "text-grey-500"
                  )}
                  width={20}
                  height={20}
                />
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
