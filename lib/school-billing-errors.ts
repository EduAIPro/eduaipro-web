import { messageText } from "@/lib/billing-errors";

export type SchoolBillingCall =
  | "purchase"
  | "renew"
  | "assign"
  | "release"
  | "demo";

export type SchoolBillingError = {
  status: number | undefined;
  call: SchoolBillingCall;
  message: string;
  code?: string;
};

const MESSAGES: Partial<
  Record<SchoolBillingCall, Partial<Record<number, string>>>
> = {
  purchase: {
    409: "Seats can’t be bought right now (no price set)",
  },
  renew: {
    404: "We couldn’t find that block of seats",
    409: "This block isn’t active, so it can’t be renewed",
  },
  assign: {
    404: "Teacher or seat not found in your school",
    409: "That seat is taken or expired, or this teacher already has a seat",
  },
  release: {
    409: "This seat is locked until its term ends because the teacher earned a certificate on it",
  },
};

export const FORBIDDEN_MESSAGE = "You don’t have access to billing";

export const toSchoolBillingError = (
  call: SchoolBillingCall,
  status: number | undefined,
  /** the server’s own message, preferred for 409/400 where it is specific */
  serverMessage: unknown,
  code?: string,
): SchoolBillingError => {
  const server = messageText(serverMessage);
  let message = server;
  if (status === 403) message = FORBIDDEN_MESSAGE;
  // 400 (quantity outside the bands) and demo 409s carry a precise message
  else if (call !== "demo" && status !== 400 && MESSAGES[call]?.[status ?? 0]) {
    message = MESSAGES[call]![status!]!;
  }
  return { call, status, message, code };
};

export const isSchoolBillingError = (e: unknown): e is SchoolBillingError =>
  typeof e === "object" && e !== null && "call" in e && "message" in e;

/** Message for toast.error, whether the error is mapped or a plain string. */
export const schoolBillingMessage = (e: unknown) =>
  isSchoolBillingError(e)
    ? e.message
    : typeof e === "string"
      ? e
      : "Something went wrong";
