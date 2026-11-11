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

// Teacher (Personal Pro) checkouts use their own key so the two flows can't
// read each other's reference.
const TEACHER_KEY = "eduaipro:teacher-checkout";

export const saveTeacherCheckout = (c: StoredCheckout) => {
  try {
    sessionStorage.setItem(TEACHER_KEY, JSON.stringify(c));
  } catch {}
};

export const readTeacherCheckout = (): StoredCheckout | null => {
  try {
    const raw = sessionStorage.getItem(TEACHER_KEY);
    return raw ? (JSON.parse(raw) as StoredCheckout) : null;
  } catch {
    return null;
  }
};

export const clearTeacherCheckout = () => {
  try {
    sessionStorage.removeItem(TEACHER_KEY);
  } catch {}
};
