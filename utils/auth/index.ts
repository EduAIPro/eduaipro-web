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

  const refreshCookie = _cookies.get("refreshToken");

  if (!refreshCookie?.value) {
    return { is_completed: true, error: "Refresh cookie does not exist" };
  }

  try {
    const { data } = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken: refreshCookie.value,
    });

    _cookies.set({
      ...CONFIG.BASE_COOKIE_OPTION,
      name: "refreshToken",
      value: data.data.tokens.refresh,
    });

    return { is_completed: true, data: data.data.tokens.access };
  } catch (err) {
    return { is_completed: true, error: `${err}` };
  }
}

export const getRefreshToken = async () => {
  const _cookies = await cookies();

  const refreshCookie = _cookies.get("refreshToken");

  return refreshCookie?.value;
};

export const deleteRefreshToken = async () => {
  const _cookies = await cookies();

  _cookies.delete("refreshToken");
};

export const setAuthCookes = async (refresh: string) => {
  const _cookies = await cookies();

  _cookies.set({
    ...CONFIG.BASE_COOKIE_OPTION,
    name: "refreshToken",
    value: refresh,
  });
};
