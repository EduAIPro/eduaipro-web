"use client";

const isSecure = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

export const CONFIG = {
  REFRESH_TOKEN_IDENTIFIER: "refreshToken",
  ACCESS_TOKEN_IDENTIFIER: "accessToken",
  USER_IDENTIFIER: "userId",
  BASE_COOKIE_OPTION: {
    httpOnly: true,
    sameSite: "strict" as "strict" | "lax",
    path: "/",
    secure: isSecure,
  },
};
