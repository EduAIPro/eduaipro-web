"use client";

const isSecure = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

export const CONFIG = {
  REFRESH_TOKEN_IDENTIFIER: "eduaipro:refresh-token",
  ACCESS_TOKEN_IDENTIFIER: "eduaipro:access-token",
  USER_IDENTIFIER: "userId",
  BASE_COOKIE_OPTION: {
    httpOnly: true,
    sameSite: "strict" as "strict" | "lax",
    path: "/",
    secure: isSecure,
  },
};
