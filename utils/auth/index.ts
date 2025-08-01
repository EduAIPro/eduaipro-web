"use server";
import api from "@/api/base";
import { CONFIG } from "@/constants/config";
import { RefreshTokenResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { isValidToken, storeAccessToken } from "./helpers";

type Response = {
  is_completed: boolean;
  error?: string;
  data?: string;
};

export async function authRefreshAction(): Promise<Response> {
  const refreshCookie = (await cookies()).get(CONFIG.REFRESH_TOKEN_IDENTIFIER);

  if (!refreshCookie?.value) {
    return { is_completed: true, error: "Refresh cookie does not exiss" };
  }

  try {
    const { data } = await api.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken: refreshCookie.value,
    });

    (await cookies()).set(
      CONFIG.REFRESH_TOKEN_IDENTIFIER,
      data.data.tokens.refresh
    );

    return { is_completed: true, data: data.data.tokens.access };
  } catch (err) {
    return { is_completed: true, error: `${err}` };
  }
}

/**
 * Retrieves the access token and ensures it is valid.
 * If the access token is expired, attempts to refresh it.
 * @returns {Promise<string | null>} Bearer token string or null if retrieval fails.
 */
export const access_token_retrieve = async (
  refreshPromise: null | Promise<string | null>
): Promise<string | null> => {
  // 1. Retrieve the access token from session storage
  let accessToken = sessionStorage.getItem("access");

  // 2. Check if the access token is expired
  const accessTokenExpired = accessToken ? !isValidToken(accessToken) : true;

  // 3. Attempt to refresh the token if it is expired
  if (accessTokenExpired) {
    // 3.1 Ensure only one refresh request is active at a time
    if (!refreshPromise) {
      refreshPromise = authRefreshAction()
        .then((serverRes) => {
          // 3.2 Handle server response to refresh action
          if (serverRes.data && !serverRes.error) {
            storeAccessToken(serverRes.data);
            return serverRes.data;
          }
          return null;
        })
        .catch(async () => {
          // 3.3 Log out user on refresh failure
          return null;
        })
        .finally(() => {
          console.log("refresh finished");
          // 3.4 Reset refreshPromise to allow future attempts
          refreshPromise = null;
        });
    }

    // 3.5 Wait for the refresh operation to complete
    const newAccessToken = await refreshPromise;
    if (newAccessToken) {
      accessToken = newAccessToken;
    }
  }

  // 4. Return the Bearer token string or null if unavailable
  return accessToken ? `Bearer ${accessToken}` : null;
};
