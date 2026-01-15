"use client";
import { loginTeacherKey } from "@/api/keys";
import { login } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { CONFIG } from "@/constants/config";
import { storeAccessToken } from "@/utils/auth/helpers";
import { trimObj } from "@/utils/key";
import { LoginFormValue, loginValidation } from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { Button } from "../ui/button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { trigger, isMutating } = useSWRMutation(loginTeacherKey, login);

  const router = useRouter();

  async function onSubmit(data: LoginFormValue) {
    try {
      const res = await trigger(trimObj(data));
      const { tokens, user, staff } = res.data;

      if (tokens.access) {
        storeAccessToken(tokens.access);
        sessionStorage.setItem(CONFIG.USER_IDENTIFIER, user.id);
      }

      if (user && user?.role && user.role === "ADMIN") {
        router.push("/admin");
        return;
      }

      if (staff.role === "TEACHER") {
        router.push("/dashboard");
      } else {
        router.push("/school");
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  }

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={defaultValues}
      // validationSchema={loginValidation}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form className="flex-col flex gap-y-4">
          <FormInput
            name="email"
            label="Email address"
            placeholder="name@example.com"
            type="email"
            error={touched.email && errors.email ? errors.email : null}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            error={touched.password && errors.password ? errors.password : null}
            type={showPassword ? "text" : "password"}
            rightIcon={
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
              </Button>
            }
          />

          <div className="flex justify-end">
            <Link href="/forgot-password">
              <p className="font-medium text-sm text-primary-300">
                Forgot your password?
              </p>
            </Link>
          </div>
          <Button type="submit" loading={isMutating} disabled={!isValid}>
            <p>Login</p>
          </Button>
          <div>
            <p className="text-center">
              {"Don't"} have an account?{" "}
              <span className="text-primary-300 hover:scale-95 duration-300 underline font-medium">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
