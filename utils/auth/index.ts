"use server";

import api from "@/api/base";
import { CONFIG } from "@/constants/config";
import { RefreshTokenResponse } from "@/types/auth";
import { cookies } from "next/headers";

type Response = {
  is_completed: boolean;
  error?: string;
  data?: string;
};

export async function authRefreshAction(): Promise<Response> {
  const _cookies = await cookies();

  const refreshCookie = _cookies.get(CONFIG.REFRESH_TOKEN_IDENTIFIER);

  if (!refreshCookie?.value) {
    return { is_completed: true, error: "Refresh cookie does not exiss" };
  }

  try {
    const { data } = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken: refreshCookie.value,
    });

    _cookies.set({
      ...CONFIG.BASE_COOKIE_OPTION,
      name: CONFIG.REFRESH_TOKEN_IDENTIFIER,
      value: data.data.tokens.refresh,
    });

    return { is_completed: true, data: data.data.tokens.access };
  } catch (err) {
    return { is_completed: true, error: `${err}` };
  }
}

export const setAuthCookes = async (access: string, refresh: string) => {
  const _cookies = await cookies();

  const isSecure = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
  _cookies.set({
    sameSite: "strict",
    path: "/",
    secure: isSecure,
    name: CONFIG.ACCESS_TOKEN_IDENTIFIER,
    value: access,
  });

  console.log({ CONFIG });

  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTION,
    name: CONFIG.REFRESH_TOKEN_IDENTIFIER,
    value: refresh,
  });
};
