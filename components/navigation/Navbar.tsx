"use client";
import { generateKey } from "@/utils/key";
import { Button, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import { HambergerMenu } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Typography from "../common/ui/Typography";
import { navLinks } from "./data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <Flex
        justify="between"
        align="center"
        className="max-sm:px-4 max-md:px-6 max-lg:px-[56px] xl:px-0 xl:max-w-[1350px] xl:mx-auto py-3 md:py-6"
      >
        <div>
          <Link href="/">
            <Image
              src={"/assets/images/logo-outline.png"}
              width={220}
              height={80}
              className="w-[140px] h-[48px] lg:w-[200px] lg:h-[60px]"
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
                      <Typography.H3 className="hover:scale-105 !text-lg lg:!text-base duration-300 !text-grey-12">
                        {item.title}
                      </Typography.H3>
                    </div>
                  </Link>
                ) : (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Flex
                        align="center"
                        gapX="3"
                        className="hover:cursor-pointer max-lg:p-4 border-b-grey-7/60 "
                      >
                        <div className="max-lg:w-full">
                          <Typography.H3 className="hover:scale-105 !text-lg lg:!text-base duration-300 !text-grey-12">
                            {item.title}
                          </Typography.H3>
                        </div>
                        <DropdownMenu.TriggerIcon
                          width={16}
                          height={16}
                          fontWeight={500}
                        />
                      </Flex>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content variant="soft">
                      {item.subItems?.map((itemSub) => (
                        <DropdownMenu.Item key={generateKey()}>
                          <Link href={itemSub.href}>
                            <Typography.H3
                              size="small"
                              className="hover:scale-105 duration-300 text-black"
                            >
                              {itemSub.title}
                            </Typography.H3>
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}
              </div>
            ))}
          </div>
          <div className="gap-4 items-center flex max-lg:hidden">
            <div className="max-lg:w-full">
              <Button
                variant="outline"
                className="btn !w-full lg:!w-36"
                onClick={() => router.push("/login")}
              >
                <Typography.P weight="semibold">Login</Typography.P>
              </Button>
            </div>
            <div className="max-lg:w-full">
              <Button
                onClick={() => router.push("/register")}
                className="primary__btn btn !w-full"
              >
                <Typography.P weight="semibold" fontColor="white">
                  Get started
                </Typography.P>
              </Button>
            </div>
          </div>
        </>
        <div
          className={`transform lg:hidden ${
            menuOpen
              ? "opacity-100 translate-y-0 !z-50"
              : "-translate-y-[140%] !z-50"
          } transition-all transform fixed w-full h-screen left-0 bg-white py-4 top-16 duration-700 ease-in-out`}
        >
          <Flex align="center" className="flex-col lg:gap-6">
            {navLinks.map((item) => (
              <div key={generateKey()} className="w-full">
                {item.href ? (
                  <Link href={item.href}>
                    <div className="border-b border-b-grey-7/60 p-4 w-full">
                      <Typography.H3 className="hover:scale-105 font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                        {item.title}
                      </Typography.H3>
                    </div>
                  </Link>
                ) : (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Flex
                        align="center"
                        gapX="3"
                        className="hover:cursor-pointer border-b p-4 border-b-grey-7/60 "
                      >
                        <div className="w-full">
                          <Typography.H3 className="hover:scale-105 font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
                            {item.title}
                          </Typography.H3>
                        </div>
                        <DropdownMenu.TriggerIcon
                          width={16}
                          height={16}
                          fontWeight={500}
                        />
                      </Flex>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                      variant="soft"
                      className="!w-[calc(100vw-16px)]"
                    >
                      {item.subItems?.map((itemSub) => (
                        <DropdownMenu.Item key={generateKey()}>
                          <Link href={itemSub.href}>
                            <Typography.H3
                              size="small"
                              className="hover:scale-105 duration-300 text-black"
                            >
                              {itemSub.title}
                            </Typography.H3>
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}
              </div>
            ))}
          </Flex>
          <Flex
            gap="4"
            align="center"
            className="px-4 w-full mt-5 justify-between"
          >
            <div className="w-full">
              <Button
                variant="outline"
                className="btn !w-full lg:!w-36"
                onClick={() => router.push("/login")}
              >
                <Typography.P weight="semibold">Login</Typography.P>
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => router.push("/register")}
                className="primary__btn btn !w-full"
              >
                <Typography.P weight="semibold" fontColor="white">
                  Get started
                </Typography.P>
              </Button>
            </div>
          </Flex>
        </div>

        <div className="lg:hidden">
          <Button
            onClick={toggleMenu}
            variant="outline"
            className="!cursor-pointer"
          >
            <HambergerMenu width={24} height={24} />
          </Button>
        </div>
      </Flex>
    </nav>
  );
}
