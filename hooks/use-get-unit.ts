import { getUnitDetails } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import { UnitDetails } from "@/types/course";
import useSWR from "swr";

export default function useGetUnit({ unitId }: { unitId: string | null }) {
  const response = useSWR<UnitDetails>(
    unitId ? [getUnitDetails, unitId] : null,
    fetchWithSingleParam
  );

  return response;
}
