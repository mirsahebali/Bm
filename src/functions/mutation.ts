import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
export function useCreateData(
  category: string,
  fetchUrl: string,
  name: string,
  refetchCategory: string
) {
  const queryClient = useQueryClient();
  const { refetch } = useQuery([refetchCategory]);
  const { mutateAsync, mutate, data, error, isLoading, isError, isSuccess, reset } = useMutation({
    mutationKey: [category],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const res = await fetch(`http://localhost:3000/api/${fetchUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
        cache: "no-store",
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([refetchCategory]);
      refetch();
    },
  });
  return {
    mutateAsync,
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    reset,
  };
}
export function useSetDefaultWs(id: string, email: string) {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, data, isSuccess, isError, isLoading, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/api/user/default/workspace/${email}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["default_ws"]),
  });
  return { mutate, data, mutateAsync, isSuccess, isError, isLoading, error };
}
