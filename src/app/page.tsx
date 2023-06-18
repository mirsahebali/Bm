"use client";
import { Tab } from "@headlessui/react";
import { Input, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, SyntheticEvent, useEffect, FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "@/functions/query";
import { useCreateData } from "@/functions/mutation";
import { setId as setListId } from "@/features/listSlice";
import { BsPlusSquareDotted } from "react-icons/bs";
import Create from "@/components/create/components/create";
export default function Page() {
  const boardObj = useAppSelector((state) => state.board.obj);
  const dispatch = useAppDispatch()
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
    isStale,
  } = useFetchData("lists", `lists/read/${boardObj.id}`);
  const createListMutate = useCreateData(
    "create list",
    `lists/create/${boardObj.id}`,
    name,
    "lists"
  );

  useEffect(() => {
    refetch();
  }, [boardObj.id, createListMutate.isSuccess]);
  if (!boardObj) {
    return <div className="flex justify-center items-center">Select a board</div>;
  }
  if (isError || isLoadingError) {
    console.error(error);
  }
  if (isLoading) {
    return <div className="flex justify-center items-center">Loading lists....</div>;
  }
  if (isSuccess || isStale) {
    console.log(lists?.data);

    return (
      <div className="flex flex-col justify-center items-center mt-5 relative top-28 object-center w-full h-fit ">
        <Tab.Group>
          <div>{boardObj.name}</div>
          <Tab.List className="flex gap-2 space-x-1 rounded-xl bg-blue-900/20 p-1">
            {lists?.data?.map((list: { name: string; id: string }) => {
              return (
                <Tab
                  key={list.id}
                  className={({ selected }) =>
                    classNames(
                      "w-fit rounded-lg py-2.5 text-sm font-medium leading-5 ",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                  onClick={() => dispatch(setListId(list.id))}
                >
                  {list.name}
                </Tab>
              );
            })}
            <div>
              <Create parentId={boardObj.id} category="lists" mutationKey="create list" />
            </div>
            {/* <div */}
            {/*   className="w-fit rounded-lg py-2.5 px-4 cursor-pointer text-sm font-medium leading-5 text-blue-700 hover:bg-white/[0.12] hover:text-white" */}
            {/* > */}
            {/*   <BsPlusSquareDotted/> */}
            {/* </div> */}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  }
}
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
