import { SITE_URL } from "@/utils/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/dashboard/",
        "/admin",
        "/admin/",
        "/school",
        "/school/",
        "/forgot-password",
        "/verify-email",
        "/accept-invite",
        "/register/success",
        "/maintenance",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
