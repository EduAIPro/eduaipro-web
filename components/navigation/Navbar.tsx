"use client";
import { generateKey } from "@/utils/key";
import { ChevronDownIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useHasScrolled } from "@/hooks/use-has-scrolled";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Typography from "../common/ui/Typography";
import { Button } from "../ui/button";
import { navLinks } from "./data";
import { getRefreshToken } from "@/utils/auth";
import { getTokenRole } from "@/utils/auth/helpers";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState<null | string>(null);

  const router = useRouter();
  const { hasScrolled } = useHasScrolled();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    async function checkAuth() {
      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        const role = getTokenRole(refreshToken);
        const dashboardUrl =
          role === "TEACHER" || role === "USER"
            ? "/dashboard"
            : role === "ADMIN"
              ? "/admin"
              : "/school";

        setDashboardUrl(dashboardUrl);
      }
    }

    checkAuth();
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full inset-x-0 top-0 z-50",
        hasScrolled
          ? "backdrop-blur-lg bg-[#E1EAFF]/5 shadow-lg shadow-black/5"
          : "",
      )}
    >
      <div className="max-sm:px-4 max-md:px-6 max-lg:px-[56px] xl:px-0 xl:max-w-[1350px] xl:mx-auto py-3 md:py-6 flex justify-between items-center">
        <div>
          <Link href="/">
            <Image
              src={"/assets/images/logo-outline.png"}
              width={150}
              height={80}
              className="w-[140px] h-[48px] lg:w-[130px] lg:h-[48px]"
              alt=""
            />
          </Link>
        </div>
        {/* desktop view  */}
        <>
          <div className="gap-6 flex items-center max-lg:hidden">
            {navLinks.map((item) => (
              <div key={generateKey()}>
                {item.href ? (
                  <Link href={item.href}>
                    <div className="border-b-grey-7/60">
                      <Typography.H3 className="hover:scale-95 !font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                        {item.title}
                      </Typography.H3>
                    </div>
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="hover:cursor-pointer max-lg:p-4 border-b-grey-7/60 flex items-center gap-3">
                        <div className="max-lg:w-full">
                          <Typography.H3 className="hover:scale-95 !font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                            {item.title}
                          </Typography.H3>
                        </div>
                        <ChevronDownIcon className="size-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.subItems?.map((itemSub) => (
                        <DropdownMenuItem key={generateKey()}>
                          <Link href={itemSub.href}>
                            <Typography.H3 size="small" className="text-black">
                              {itemSub.title}
                            </Typography.H3>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
          <div className="gap-4 items-center flex max-lg:hidden">
            {dashboardUrl && dashboardUrl !== null ? (
              <>
                <Button onClick={() => router.push(dashboardUrl)}>
                  <Typography.P weight="semibold" fontColor="white">
                    Dashboard
                  </Typography.P>
                </Button>
              </>
            ) : (
              <>
                <div className="max-lg:w-full">
                  <Button
                    variant="ghost"
                    className="hover:bg-primary-200/20 transition-all hover:border border-primary-200"
                    onClick={() => router.push("/login")}
                  >
                    <Typography.P weight="semibold">Login</Typography.P>
                  </Button>
                </div>
                <div className="max-lg:w-full">
                  <Button onClick={() => router.push("/register")}>
                    <Typography.P weight="semibold" fontColor="white">
                      Get started
                    </Typography.P>
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
        <div
          className={`transform lg:hidden ${
            menuOpen
              ? "opacity-100 translate-y-0 !z-50"
              : "-translate-y-[140%] !z-50"
          } transition-all transform fixed w-full h-screen left-0 bg-white py-4 top-16 duration-700 ease-in-out`}
        >
          <div className="flex-col lg:gap-6 flex items-center">
            {navLinks.map((item) => (
              <div key={generateKey()} className="w-full">
                {item.href ? (
                  <Link href={item.href}>
                    <div
                      onClick={() => toggleMenu()}
                      className="border-b border-b-grey-7/60 p-4 w-full"
                    >
                      <Typography.H3 className="hover:scale-95 font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                        {item.title}
                      </Typography.H3>
                    </div>
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full border flex items-center justify-between p-4">
                      <Typography.H3 className="hover:scale-95 font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                        {item.title}
                      </Typography.H3>
                      <ChevronDownIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="!w-[calc(100vw-16px)]">
                      {item.subItems?.map((itemSub) => (
                        <DropdownMenuItem key={generateKey()}>
                          <Link href={itemSub.href}>
                            <Typography.H3
                              size="small"
                              className="hover:scale-95 duration-300 text-black"
                            >
                              {itemSub.title}
                            </Typography.H3>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 w-full mt-5 space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              <Typography.P weight="semibold">Login</Typography.P>
            </Button>
            <Button className="w-full" onClick={() => router.push("/register")}>
              <Typography.P weight="semibold" fontColor="white">
                Get started
              </Typography.P>
            </Button>
          </div>
        </div>

        <div className="lg:hidden">
          <Button
            onClick={toggleMenu}
            variant="outline"
            className="!min-w-fit shadow-none"
          >
            {menuOpen ? (
              <X className="size-6 animate-in" />
            ) : (
              <Menu className="size-6 animate-in" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
