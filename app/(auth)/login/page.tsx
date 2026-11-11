import { getPageMetadata } from "@/utils/config";
import LoginPageClient from "./login-client";

export const metadata = getPageMetadata({
  title: "Log In",
  description: "Log in to your EduAIPro account to continue your CPD journey.",
  path: "/login",
});

export default function LoginPage() {
  return <LoginPageClient />;
}
