"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  setName as setBoardName,
  setId as setBoardId,
  setArray as setWsArray,
} from "@/features/boardSlice";
export default function Page() {
  const wsId = useAppSelector((state) => state.workspace.id);

  const dispatch = useAppDispatch();
  const {
    data: boards,
    isError,
    error,
    isLoading,
    isLoadingError,
    refetch,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/boards/read/${wsId}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [wsId, refetch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!wsId || wsId === null || wsId === "") {
    return <div>Select a workspace</div>;
  }
  if (isError || isLoadingError) {
    console.error(error);
    refetch();
  }
  dispatch(setWsArray(boards?.data));
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <h2>
          <AccordionButton
            rounded={"xl"}
            _expanded={{ bg: "#04293A", color: "white" }}
          >
            <div className="flex justify-center items-center">Boards</div>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {boards?.data
            ?.filter((data: { isDeleted: boolean }) => !data.isDeleted)
            .map((board: { id: string; name: string }) => {
              return (
                <div
                  key={board.id}
                  onClick={() => dispatch(setBoardId(board.id))}
                  className="cursor-pointer p-2 m-1"
                >
                  {board.name}
                </div>
              );
            })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
