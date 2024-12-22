"use client";
import Typography from "@/components/common/ui/Typography";
import { LuGraduationCap } from "react-icons/lu";
import { SlBookOpen } from "react-icons/sl";
import { Button } from "@radix-ui/themes";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { LoginComp } from "@/components/auth/LoginComp";
import TeacherSignup from "@/components/auth/TeacherSignup";
import InstitutionSignup from "@/components/auth/InstitutionSignup";
import AdminSignup from "@/components/auth/AdminSignup";

export default function RegisterPage() {
  const router = useRouter();
  const currentPath = usePathname();
  const userType = useSearchParams().get("type");
  const userTypes = ["institution", "teacher", "admin"];

  const selectionClass =
    "w-full rounded-[6px] hover:bg-blue-500/10 duration-700 p-2 h-full";
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
          <div className="max-sm:hidden">
            <LoginComp />
          </div>
        </div>
        <div className="lg:h-[85vh] max-xs:mt-10 max-lg:mt-20 sm:justify-center flex flex-col">
          {!userType ? (
            <div className="h-full w-full lg:max-w-[70%] mx-auto flex flex-col justify-center">
              <div className="flex flex-col gap-1 mb-5">
                <Typography.H2 size="xl" weight="semibold">
                  Welcome to EduAiPro
                </Typography.H2>
                <Typography.P>
                  Unlock your educational potential with our cutting-edge
                  platform tailored for teachers and institutions. <br />
                  <br />
                  Please select your role to personalize your experience.
                </Typography.P>
              </div>
              <div className="w-full sm:w-[70%] lg:w-[60%] flex items-center justify-center mx-auto border rounded-lg gap-2 p-2">
                <button
                  className={selectionClass}
                  onClick={() => router.replace(`${currentPath}?type=teacher`)}
                >
                  <SlBookOpen size={20} className="mx-auto" />
                  <Typography.H3 weight="medium" size="base">
                    I teach
                  </Typography.H3>
                </button>
                <button
                  className={selectionClass}
                  onClick={() =>
                    router.replace(`${currentPath}?type=institution`)
                  }
                >
                  <LuGraduationCap size={19} className="mx-auto" />
                  <Typography.H3 weight="medium" size="base">
                    I own a school
                  </Typography.H3>
                </button>
              </div>
            </div>
          ) : userTypes.includes(userType) ? (
            <div
              className={`w-full sm:w-2/3 mx-auto gap-6 flex-col flex ${
                userType === userTypes[0] ? "mt-20" : ""
              }`}
            >
              <Link href="/register">
                <div className="flex items-center gap-2">
                  <ArrowLeft />
                  <Typography.H3>Back</Typography.H3>
                </div>
              </Link>
              {userType === userTypes[1] ? (
                <TeacherSignup />
              ) : userType === userTypes[0] ? (
                <InstitutionSignup />
              ) : userType === "admin" ? (
                <AdminSignup />
              ) : null}
            </div>
          ) : (
            <div className="h-full flex-col items-center justify-center">
              <Typography.H2>That{"'"}s not right...</Typography.H2>
              <Typography.P>
                There seems to be an issue with the url. Please return to the
                home page.
              </Typography.P>
              <div className="mx-auto !w-fit">
                <Button size="3">Go back</Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="w-full h-screen bg-auth-bg bg-cover max-lg:hidden" />
    </main>
  );
}
