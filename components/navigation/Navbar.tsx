import { Flex, Link } from "@radix-ui/themes";
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
      <Flex gap="4" align="center">
        {navLinks.map((item) => (
          <div key={generateKey()}>
            {item.href ? (
              <Link href={item.href}>
                <Typography.H3
                  fontColor="dark"
                  className="hover:scale-105 duration-300 text-black"
                >
                  {item.title}
                </Typography.H3>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </Flex>
      <div></div>
    </Flex>
  );
}
