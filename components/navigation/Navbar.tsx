"use client";
import { Button, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import { navLinks } from "./data";
import { generateKey } from "@/utils/key";
import Typography from "../common/ui/Typography";
import { HambergerMenu } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Flex
      justify="between"
      align="center"
      className="px-4 lg:px-[48px] xl:px-[100px] py-6"
    >
      <div>
        <Image
          src={"/assets/images/logo-no-bg.png"}
          width={120}
          height={56}
          alt=""
        />
      </div>
      <div
        className={`transform ${
          menuOpen
            ? "opacity-100 max-lg:translate-y-0 max-lg:!z-50"
            : "max-lg:-translate-y-[140%] max-lg:!z-50"
        } transition-all transform max-lg:fixed w-full max-lg:h-screen lg:flex lg:justify-around left-0 bg-white max-lg:py-4 max-lg:top-16 duration-700 ease-in-out`}
      >
        <Flex align="center" className="max-lg:flex-col lg:gap-6">
          {navLinks.map((item) => (
            <div key={generateKey()} className="max-lg:w-full">
              {item.href ? (
                <Link href={item.href}>
                  <div className="max-lg:border-b border-b-grey-7/60 max-lg:p-4 max-lg:w-full">
                    <Typography.H3 className="hover:scale-105 max-lg:font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
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
                      className="hover:cursor-pointer max-lg:border-b max-lg:p-4 border-b-grey-7/60 "
                    >
                      <div className="max-lg:w-full">
                        <Typography.H3 className="hover:scale-105 max-lg:font-medium !text-lg lg:!text-base duration-300 !text-grey-12">
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
                    className="max-lg:!w-[calc(100vw-16px)]"
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
          className="max-lg:px-4 max-lg:w-full max-lg:mt-5 max-lg:justify-between"
        >
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
  );
}
