import { getSchoolStaffsKey, schoolSeatsKey } from "@/api/keys";
import { mutate } from "swr";

export const invalidateSeats = () => mutate(schoolSeatsKey);

export const invalidateRoster = () =>
  mutate((key) => Array.isArray(key) && key[0] === getSchoolStaffsKey);

/** Certificates are queued server-side, so refetch once more after a pause. */
export const invalidateSeatsAndRoster = (delayedRosterMs = 4000) => {
  invalidateSeats();
  invalidateRoster();
  setTimeout(invalidateRoster, delayedRosterMs);
};
