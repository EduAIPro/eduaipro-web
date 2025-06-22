"use client";
import { useMutationApi } from "@/api/hooks/useMutationApi";
import { useQueryApi } from "@/api/hooks/useQueryApi";
import { GET_SCHOOL_BY_ID_QUERY_KEY } from "@/api/keys";
import { schoolLogin } from "@/api/mutations";
import { getSchoolById } from "@/api/queries";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import SchoolAuth from "@/public/assets/images/school-auth.png";
import useSchoolStore from "@/store/school";
import { School } from "@/types/school";
import { trimObj } from "@/utils/key";
import { loginValidation } from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseQueryResult } from "react-query";

export default function SchoolLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const router = useRouter();
  const { setSchool } = useSchoolStore();

  const getSchoolQuery: UseQueryResult<{ data: School }> = useQueryApi(
    [GET_SCHOOL_BY_ID_QUERY_KEY, schoolId],
    getSchoolById(schoolId),
    {
      enabled: !!schoolId,
      onSuccess(data) {
        if (data.data) {
          toast({
            title: "Login successful 🎉",
          });
          setSchool(data.data);
          router.push("/school");
        }
      },
    }
  );

  const loginMutation = useMutationApi(
    "SCHOOL_LOGIN_MUTATION_KEY",
    schoolLogin,
    {
      onSuccess: (data) => {
        const _res = data.data;
        setSchoolId(_res.school.id);
      },
      onError(err) {
        toast({
          title: err as string,
          variant: "destructive",
        });
      },
    }
  );

  const initialData = {
    email: "",
    password: "",
  };

  return (
    <section className="lg:grid grid-cols-2 gap-6 min-h-screen px-6 lg:p-6 xl:max-h-screen">
      <div className="pt-6 h-screen lg:max-h-screen max-sm:space-y-12 max-lg:space-y-20">
        <Link href="/">
          <Image
            src="/assets/images/logo-outline.png"
            width={120}
            height={70}
            alt=""
          />
        </Link>
        <div className="h-full flex lg:items-center lg:justify-center">
          <div className="lg:max-w-lg w-full space-y-6">
            <div>
              <h1 className="font-semibold text-grey-800/80 text-2xl sm:text-3xl">
                Login
              </h1>
              <p className="font-medium text-grey-500">
                Log in now to access your teachers and their accreditation
                details!
              </p>
            </div>
            <div>
              <Formik
                initialValues={initialData}
                validationSchema={loginValidation}
                autoComplete="off"
                onSubmit={(values) => {
                  loginMutation.mutate(
                    trimObj({ ...values, officialEmail: values.email })
                  );
                }}
              >
                {({ errors, touched, isValid }) => (
                  <Form className="flex-col flex gap-y-4">
                    <FormInput
                      name="email"
                      label="Email address"
                      placeholder="name@example.com"
                      type="email"
                      error={
                        touched.email && errors.email ? errors.email : null
                      }
                    />
                    <FormInput
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : null
                      }
                      type={showPassword ? "text" : "password"}
                      rightIcon={
                        <div
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="size-5" />
                          ) : (
                            <EyeClosed className="size-5" />
                          )}
                        </div>
                      }
                    />
                    <div className="flex justify-end">
                      <p className="fone-semibold text-grey-500 hover:underline hover:text-primary-400 cursor-pointer">
                        Forgot your password?
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      loading={
                        loginMutation.isLoading || getSchoolQuery.isRefetching
                      }
                    >
                      Login
                    </Button>
                    <div className="flex items-center justify-between font-medium">
                      <p className="text-center">{"Don't"} have an account? </p>
                      <Link href="/register?type=institution">
                        <p className="underline text-brand-900 inline-block">
                          Create account
                        </p>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-screen max-lg:hidden">
        <Image
          width={500}
          src={SchoolAuth}
          alt="school auth"
          className="h-[calc(100vh-48px)] w-full"
        />
      </div>
    </section>
  );
}
