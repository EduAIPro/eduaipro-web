"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-xs:mt-10 max-lg:mt-20 sm:justify-center flex flex-col h-full">
      <div className="w-full space-y-6">
        <div>
          <h2 className="font-semibold text-grey-800 text-2xl">Welcome back</h2>
          <p className="text-base font-medium text-grey-650">
            Fill in your details
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
