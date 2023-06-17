"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FaTrashRestoreAlt } from "react-icons/fa";
export default function Page() {
  const queryClient = useQueryClient();
  const {
    data: trashBoards,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["trash_boards"],
    queryFn: async () => {
      const data = await fetch("http://localhost:3000/api/boards/trash", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        cache: "no-store",
      });
      return await data.json();
    },
  });
  const restoreMutation = useMutation({
    mutationKey: ["restore board"],
    mutationFn: async (id: string) => {
      const data = await fetch(
        `http://localhost:3000/api/boards/restore/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await data.text();
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["trash_boards"]);
      queryClient.invalidateQueries(["boards"]);
    },
  });
  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div className="m-5 flex justify-center items-center">
      <ul className="relative right-0 inset-0 ">
        {trashBoards.data
          ?.filter(({ isDeleted }: { isDeleted: boolean }) => isDeleted)
          ?.map(({ name, id }: { name: string; id: string }) => {
            return (
              <li
                className="m-2 border rounded-lg p-2 border-white flex flex-col justify-center items-center"
                key={id}
              >
                <div>{name} </div>
                <FaTrashRestoreAlt
                  className="text-red-500 hover:scale-110 duration-300"
                  onClick={() => {
                    restoreMutation.mutateAsync(id);
                  }}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
