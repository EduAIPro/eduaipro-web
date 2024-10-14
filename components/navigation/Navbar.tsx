"use client";
import { Box, Button, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { navLinks } from "./data";
import { generateKey } from "@/utils/key";
import Typography from "../common/ui/Typography";

export default function Navbar() {
  return (
    <Flex justify="between" px="120px" py="6">
      <div>
        <Image
          src={"/assets/images/logo-no-bg.png"}
          width={120}
          height={56}
          alt=""
        />
      </div>
      <Flex gap="6" align="center">
        {navLinks.map((item) => (
          <div key={generateKey()}>
            {item.href ? (
              <Link href={item.href}>
                <Typography.H3
                  fontColor="dark"
                  size="base"
                  className="hover:scale-105 duration-300 text-black"
                >
                  {item.title}
                </Typography.H3>
              </Link>
            ) : (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Flex
                    align="center"
                    gapX="3"
                    className="hover:cursor-pointer"
                  >
                    <Typography.H3
                      fontColor="dark"
                      size="base"
                      className="hover:scale-105 duration-300 text-black"
                    >
                      {item.title}
                    </Typography.H3>

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
      </Flex>
      <Flex gap="4" align="center">
        <Button variant="outline" className="btn !w-36">
          <Typography.P weight="semibold">Login</Typography.P>
        </Button>
        <Button className="primary__btn btn">
          <Typography.P weight="semibold">Get started</Typography.P>
        </Button>
      </Flex>
    </Flex>
  );
}
