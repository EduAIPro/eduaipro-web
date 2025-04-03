"use client";

import LoginForm from "@/components/auth/LoginForm";
import Typography from "@/components/common/ui/Typography";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="lg:flex flex-row justify-between">
      <section className="w-full p-4 xs:p-6 max-lg:min-h-screen">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/images/logo-outline.png"
              width={120}
              height={70}
              alt=""
            />
          </Link>
          <div className="flex items-center gap-x-3 max-sm:hidden">
            <Typography.H3 className="text-center" weight="medium" size="base">
              {"Don't"} have an account?{" "}
            </Typography.H3>
            <Link href="/register">
              <Button className="btn" size="2">
                <h3 className="font-medium">Sign up</h3>
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:h-[70vh] max-xs:mt-10  max-lg:mt-20 sm:justify-center flex flex-col">
          <div className="w-full sm:w-2/3 mx-auto flex-col flex gap-y-6">
            <div className="text-left">
              <Typography.H2 size="basePro" weight="semibold">
                Welcome back
              </Typography.H2>
              <Typography.P weight="medium" size="large" fontColor="medium">
                Fill in your details
              </Typography.P>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
      <section className="w-full h-screen bg-auth-bg bg-cover max-lg:hidden"></section>
    </main>
  );
}
{
  /* <Image
  src="/assets/images/img17.jpg"
  alt=""
  width="700"
  height="700"
  className="w-full h-screen"
/> */
}
// 6, 7, 10, 12, 13, 14, 16, 17
