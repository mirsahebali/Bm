"use client";
import { Tab } from "@headlessui/react";
import { Input, Button } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import { useState, SyntheticEvent, useEffect, FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "@/functions/query";
export default function Page() {
  const boardId = useAppSelector((state) => state.board.id);
  const boardName = useAppSelector((state) => state.board.name);
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const {
    data: lists,
    isError,
    isLoading,
    isSuccess,
    isLoadingError,
    error,
    refetch,
  } = useFetchData("lists", `lists/read/${boardId}`);
  const createListMutation = useMutation({
    mutationKey: ["create list"],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const data = await fetch(
        `http://localhost:3000/api/lists/create/${boardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      return await data.text();
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["lists"]);
      console.log("Successfully created list with board id: %s", boardId);
    },
    onError: () => {
      console.log("Failed to create list with board id: %s", boardId);
    },
  });

  if (isError) {
    console.error(error);
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">Loading lists....</div>
    );
  }
  if (isSuccess) {
    console.log(lists?.data);

    return (
      <div className="grid place-items-center mt-5 w-full h-fit">
        <Tab.Group>
          <Tab.List>
            <div>{boardName}</div>
            {lists?.data?.map((list: { name: string; id: string }) => {
              return (
                <Tab
                  key={list.id}
                  className={`text-2xl hover:text-black dark:text-white`}
                >
                  {list.name}
                </Tab>
              );
            })}
          </Tab.List>
        </Tab.Group>
        <form onSubmit={createListMutation.mutateAsync}>
          {" "}
          <Input
            placeholder="create list"
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
          />
          <Button
            size="md"
            width="fit-content"
            border="2px"
            color={`white`}
            flex="1"
            justifyContent={"center"}
            alignItems={"center"}
            className="hover:text-black"
            borderColor="green.500"
            type="submit"
          >
            +
          </Button>
        </form>
      </div>
    );
  }
}
