import { useQuery } from "@tanstack/react-query";

export function useFetchData(category: string, fetchUrl: string) {
  const {
    data,
    error,
    isError,
    isLoading,
    isLoadingError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [category],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/${fetchUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await res.json();
    },
  });
  return {
    data,
    error,
    isSuccess,
    isLoadingError,
    isError,
    isLoading,
    refetch,
  };
}
