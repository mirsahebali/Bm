import { useQuery} from "@tanstack/react-query";

export function useFetchData(category:  string[], fetchUrl: string) {
  const {
    data,
    error,
    isError,
    isLoading,
    isLoadingError,
    isSuccess,
    refetch,
    isStale,
    
  } = useQuery({
    queryKey: category,
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
    isStale
  };
}
export function useGetDefault(email:string, category: string){
  const {data, isSuccess, isLoadingError, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["default_"  + category],
    queryFn: async () => {
  const data = await fetch(`http://localhost:3000/api/user/default/${category}/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return await data.json()
    }
  })
return {
  data,
  isSuccess,
  isLoadingError,
  isLoading,
  isError,
  error,
  refetch
  }
}
