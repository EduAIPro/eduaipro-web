"use client";
import AdminSignup from "@/components/auth/AdminSignup";
import InstitutionSignup from "@/components/auth/InstitutionSignup";
import { LoginComp } from "@/components/auth/LoginComp";
import TeacherSignup from "@/components/auth/TeacherSignup";
import Typography from "@/components/common/ui/Typography";
import { userRoles } from "@/utils/data";
import { Button } from "@radix-ui/themes";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="lg:flex flex-row justify-between">
      <section className="w-full p-4 xs:p-6 min-h-screen">
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
        <Suspense>
          <RegisterForm />
        </Suspense>
      </section>
      <section className="w-full min-h-screen bg-auth-bg bg-cover max-lg:hidden" />
    </main>
  );
}

const RegisterForm = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const userType = useSearchParams().get("type");
  const userTypes = ["institution", "teacher", "admin"];
  return (
    <div className="lg:min-h-[85vh] max-sm:mt-10 sm:justify-center flex flex-col">
      {!userType ? (
        <div className="h-full w-full lg:max-w-[80%] xl:max-w-[70%] mx-auto flex flex-col justify-center">
          <div className="flex flex-col gap-1 mb-5">
            <Typography.H2 size="xl" weight="semibold">
              Welcome to EduAiPro
            </Typography.H2>
            <Typography.P>
              Unlock your educational potential with our cutting-edge platform
              tailored for teachers and institutions. <br />
              <br />
              Please select your role to personalize your experience.
            </Typography.P>
          </div>
          <div className="w-full md:w-full xl:w-[65%] flex flex-col mx-auto rounded-lg gap-2 p-2">
            {userRoles.map((item, idx) => (
              <button
                className="w-full rounded-[6px] group hover:bg-blue-500/10 duration-700 p-3 h-full flex items-center gap-3 border"
                key={idx + "hardman"}
                onClick={() =>
                  router.replace(
                    idx !== 4
                      ? `${currentPath}?type=teacher`
                      : `${currentPath}?type=institution`
                  )
                }
              >
                <div className="w-fit rounded-full bg-blue-300/10 group-hover:bg-white/70 duration-500 p-2">
                  <item.icon
                    size={20}
                    className="mx-auto text-brand-1001"
                    stroke="3"
                  />
                  {/* <LuGraduationCap size={19} className="mx-auto" /> */}
                </div>
                <div>
                  <Typography.H3 weight="medium" size="base">
                    {item.title}
                  </Typography.H3>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : userTypes.includes(userType) ? (
        <div className={`w-full sm:w-4/5 md:w-2/3 mx-auto gap-6 flex-col flex`}>
          <Link href="/register">
            <div className="flex items-center gap-2 w-fit">
              <ArrowLeft />
              <Typography.H3 size="base">Back</Typography.H3>
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
            There seems to be an issue with the url. Please return to the home
            page.
          </Typography.P>
          <div className="mx-auto !w-fit">
            <Button size="3">Go back</Button>
          </div>
        </div>
      )}
    </div>
  );
};
