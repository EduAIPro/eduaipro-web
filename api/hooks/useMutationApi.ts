import { useMutation, useQueryClient } from "react-query";
// import { message } from "antd"; // For user feedback

type UseMutationApiOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export const useMutationApi = (
  mutationKey: string,
  mutationFn: (data: any) => Promise<any>,
  invalidateQueries: string[],
  options?: UseMutationApiOptions
) => {
  const queryClient = useQueryClient();

  return useMutation(mutationKey, mutationFn, {
    onSuccess: (data) => {
      // message.success("Action completed successfully!");
      invalidateQueries.forEach((key) => queryClient.invalidateQueries(key));
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      // message.error("Action failed!");
      options?.onError?.(error);
    },
  });
};
