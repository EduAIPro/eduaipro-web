"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavItems } from "./nav";

type SchoolLayoutHeaderProps = {};

export const SchoolLayoutHeader = ({}: SchoolLayoutHeaderProps) => {
  const path = usePathname();
  const router = useRouter();
  return (
    <header className="bg-white flex items-center justify-between p-5 fixed top-0 w-full inset-x-0">
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
      <ul className="flex-shrink-0 gap-3 flex items-center justify-center">
        {NavItems.map((i) => {
          const Icon = path === i.url ? i.activeIcon : i.icon;
          return (
            <Button
              variant="ghost"
              key={i.name}
              onClick={() => router.push(i.url)}
              className={cn(
                path === i.url ? "border border-[#AFCAFC] !bg-[#EEF5FF]" : ""
              )}
            >
              <Icon />
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
      <div className="flex-shrink-0">
        <Button variant="outline">
          <BellIcon />
        </Button>
      </div>
    </header>
  );
};
