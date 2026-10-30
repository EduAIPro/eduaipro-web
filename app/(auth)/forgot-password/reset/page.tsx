import { getPageMetadata } from "@/utils/config";
import ResetPasswordClient from "./reset-client";

export const metadata = getPageMetadata({
  title: "Set a New Password",
  description: "Choose a new password for your EduAIPro account.",
  path: "/forgot-password/reset",
  noIndex: true,
});

export default function ResetPassword() {
  return <ResetPasswordClient />;
}
