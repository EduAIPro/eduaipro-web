import { CONFIG } from "@/constants/config";
import { UserRoles } from "@/types/auth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { authRefreshAction } from ".";

export function tokenExpired(token: string) {
  const decoded = jwtDecode(token.trim());
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const threeMinutesInSeconds = 3 * 60;
  const hasExpired =
    !decoded.exp || decoded.exp < currentTime + threeMinutesInSeconds;
  return hasExpired;
}

export function isValidToken(token: string, tokenType?: string) {
  const decoded = jwtDecode(token.trim()) as JwtPayload & {
    token_type: string;
  };

  const isExpired = tokenExpired(token);
  const isValidType = tokenType ? decoded.token_type === tokenType : true;

  // If the token is expired, it's not valid
  return !isExpired && isValidType;
}

export function getTokenRole(token: string) {
  const decoded = jwtDecode(token.trim()) as JwtPayload & {
    role: UserRoles;
  };

  return decoded.role;
}

export function storeAccessToken(token: string) {
  sessionStorage.setItem(CONFIG.ACCESS_TOKEN_IDENTIFIER, token);
}

export function deleteAccessToken() {
  sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);
}

/**
 * Retrieves the access token and ensures it is valid.
 * If the access token is expired, attempts to refresh it.
 * @returns {Promise<string | null>} Bearer token string or null if retrieval fails.
 */
export const access_token_retrieve = async (
  refreshPromise: null | Promise<string | null>
): Promise<string | null> => {
  let accessToken = sessionStorage.getItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);

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
