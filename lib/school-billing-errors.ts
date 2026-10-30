export type SchoolBillingCall = "purchase" | "assign" | "release" | "cancel";

export type SchoolBillingError = {
  status: number | undefined;
  call: SchoolBillingCall;
  message: string;
};

const MESSAGES: Partial<
  Record<SchoolBillingCall, Partial<Record<number, string>>>
> = {
  purchase: {
    409: "Seats can’t be bought right now (no price set)",
    400: "Invalid return address",
  },
  assign: {
    404: "Teacher or seat not found in your school",
    409: "That seat is taken or expired, or this teacher already has a seat",
    400: "Choose a pathway for this Basic seat",
  },
  release: {
    409: "This seat is consumed and locked until the term ends",
  },
};

export const FORBIDDEN_MESSAGE = "You don’t have access to billing";

export const toSchoolBillingError = (
  call: SchoolBillingCall,
  status: number | undefined,
  fallback: string,
): SchoolBillingError => ({
  call,
  status,
  message:
    status === 403
      ? FORBIDDEN_MESSAGE
      : (MESSAGES[call]?.[status ?? 0] ?? fallback),
});

export const isSchoolBillingError = (e: unknown): e is SchoolBillingError =>
  typeof e === "object" && e !== null && "call" in e && "message" in e;

/** Message for toast.error, whether the error is mapped or a plain string. */
export const schoolBillingMessage = (e: unknown) =>
  isSchoolBillingError(e)
    ? e.message
    : typeof e === "string"
      ? e
      : "Something went wrong";
