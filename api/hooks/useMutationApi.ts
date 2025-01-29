import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
// import { message } from "antd"; // For user feedback

type UseMutationApiOptions<TData, TError, TVariables> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
} & Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;

export const useMutationApi = <
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  mutationKey: string,
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationApiOptions<TData, TError, TVariables>,
  invalidateQueries?: string[]
): UseMutationResult<TData, TError, TVariables> => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>(mutationKey, mutationFn, {
    onSuccess: (data) => {
      // message.success("Action completed successfully!");
      if (invalidateQueries) {
        invalidateQueries.forEach((key) => queryClient.invalidateQueries(key));
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      // message.error("Action failed!");
      options?.onError?.(error);
    },
    onSettled: (data, error) => {
      options?.onSettled?.(data, error ?? null);
    },
    ...options, // Spread any additional options passed by the user
  });
};
