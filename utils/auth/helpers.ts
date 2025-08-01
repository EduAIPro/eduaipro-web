import { CONFIG } from "@/constants/config";
import { JwtPayload, jwtDecode } from "jwt-decode";

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

export function storeAccessToken(token: string) {
  sessionStorage.setItem(CONFIG.ACCESS_TOKEN_IDENTIFIER, token);
}

export function deleteAccessToken() {
  sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_IDENTIFIER);
}
