import { getSchoolStaffsKey, schoolSeatsKey } from "@/api/keys";
import { useSWRConfig } from "swr";

export const useSchoolInvalidate = () => {
  const { mutate } = useSWRConfig();

  const invalidateSeats = () => mutate(schoolSeatsKey);

  const invalidateRoster = () =>
    mutate((key) => Array.isArray(key) && key[0] === getSchoolStaffsKey);

  /** Certificates are queued server-side, so refetch once more after a pause. */
  const invalidateSeatsAndRoster = (delayedRosterMs = 4000) => {
    invalidateSeats();
    invalidateRoster();
    setTimeout(invalidateRoster, delayedRosterMs);
  };

  return { invalidateSeats, invalidateSeatsAndRoster };
};
