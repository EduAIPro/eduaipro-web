import { getPageMetadata } from "@/utils/config";
import ForgotPasswordPageClient from "./forgot-password-client";

export const metadata = getPageMetadata({
  title: "Reset Your Password",
  description: "Request a password reset for your EduAIPro account.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageClient />;
}
