import { StoredCheckout } from "@/types/school/billing";

const KEY = "eduaipro:school-checkout";

export const saveCheckout = (c: StoredCheckout) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
};

export const readCheckout = (): StoredCheckout | null => {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredCheckout) : null;
  } catch {
    return null;
  }
};

export const clearCheckout = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
};

export const CHECKOUT_RETURN_PATH = "/school/billing?checkout=return";
