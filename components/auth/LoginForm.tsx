"use client";
import { useMutationApi } from "@/api/hooks/useMutationApi";
import { LOGIN_MUTATION_KEY } from "@/api/keys";
import { login } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import Typography from "@/components/common/ui/Typography";
import { useToast } from "@/hooks/use-toast";
import { trimObj } from "@/utils/key";
import { loginValidation } from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, Sms } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutationApi(LOGIN_MUTATION_KEY, login, {
    onSuccess: (data) => {
      toast({
        title: "Login successful 🎉",
      });

      router.push("/dashboard/personal-development-plan");
    },
    onError(err) {
      toast({
        title: err as string,
        variant: "destructive",
      });
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginValidation}
      onSubmit={(values) => {
        loginMutation.mutate(trimObj(values));
      }}
      autoComplete="off"
    >
      {({ errors, touched }) => (
        <Form className="flex-col flex gap-y-4">
          <FormInput
            name="email"
            label="Email address"
            placeholder="name@example.com"
            type="email"
            error={touched.email && errors.email ? errors.email : null}
            leftIcon={<Sms />}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            error={touched.password && errors.password ? errors.password : null}
            type={showPassword ? "text" : "password"}
            leftIcon={<KeySquare />}
            rightIcon={
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </div>
            }
          />
          <div className="flex justify-end">
            <Typography.H3 fontColor="brand" weight="medium" size="base">
              Forgot your password?
            </Typography.H3>
          </div>
          <Button
            disabled={loginMutation.isLoading}
            loading={loginMutation.isLoading}
            className="primary__btn btn"
          >
            <Typography.P fontColor="white">Login</Typography.P>
          </Button>
          <div className="sm:hidden">
            <Typography.H3 className="text-center" weight="medium" size="base">
              {"Don't"} have an account?{" "}
              <Link href="/register">
                <h3 className="underline text-brand-900 inline-block">
                  Sign up
                </h3>
              </Link>
            </Typography.H3>
          </div>
        </Form>
      )}
    </Formik>
  );
}
