import { getPageMetadata } from "@/utils/config";
import RegisterPageClient from "./register-client";

export const metadata = getPageMetadata({
  title: "Sign Up",
  description:
    "Create your free EduAIPro account and start an accredited CPD pathway today.",
  path: "/register",
});

export default function RegisterPage() {
  return <RegisterPageClient />;
}
