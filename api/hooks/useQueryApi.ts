import { useQuery } from "react-query";
import api from "../base";

type UseQueryApiOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enabled?: boolean;
};

export const useQueryApi = (
  queryKey: string | string[],
  url: string,
  options?: UseQueryApiOptions
) => {
  return useQuery(
    queryKey,
    async () => {
      const { data } = await api.get(url);
      return data;
    },
    {
      onSuccess: (data: any) => {
        // message.success("Data fetched successfully!");
        options?.onSuccess?.(data);
      },
      onError: (error: any) => {
        // message.error("Failed to fetch data!");
        options?.onError?.(error);
      },
      enabled: options?.enabled !== undefined ? options?.enabled : true,
    }
  );
};
