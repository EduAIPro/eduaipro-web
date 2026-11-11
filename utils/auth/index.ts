"use server";

import api from "@/api/base";
import { CONFIG } from "@/constants/config";
import { RefreshTokenResponse, UserRoles } from "@/types/auth";
import { cookies } from "next/headers";

type Response = {
  is_completed: boolean;
  error?: string;
  data?: string;
};

export async function authRefreshAction(): Promise<Response> {
  const _cookies = await cookies();

  const refreshCookie = _cookies.get("eduaipro:refresh-token");

  if (!refreshCookie?.value) {
    return { is_completed: true, error: "Refresh cookie does not exist" };
  }

  try {
    const { data } = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken: refreshCookie.value,
    });

    _cookies.set({
      ...CONFIG.BASE_COOKIE_OPTION,
      name: "eduaipro:refresh-token",
      value: data.data.tokens.refresh,
    });

    return { is_completed: true, data: data.data.tokens.access };
  } catch (err) {
    return { is_completed: true, error: `${err}` };
  }
}

export const getRefreshToken = async () => {
  const _cookies = await cookies();

  const refreshCookie = _cookies.get("eduaipro:refresh-token");

  return refreshCookie?.value;
};

export const deleteRefreshToken = async () => {
  const _cookies = await cookies();

  _cookies.delete("eduaipro:refresh-token");
  _cookies.delete("eduaipro:role");
};

export const setAuthCookes = async (refresh: string) => {
  const _cookies = await cookies();

  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTION,
    name: "eduaipro:refresh-token",
    value: refresh,
  });
};

// The middleware can only read cookies (it runs on the edge, before any
// client state exists) — so the role it routes on has to be written here,
// at login/signup, rather than decoded from the access/refresh token.
export const setRoleCookie = async (role: UserRoles) => {
  const _cookies = await cookies();

  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTION,
    name: "eduaipro:role",
    value: role,
  });
};
