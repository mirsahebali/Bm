"use client";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useFetchData } from "@/functions/query";
import { setId as setListId, setName as setListName } from "@/features/listSlice";
import CreateBookmark from "@/components/create/bookmarks";
import Create from "@/components/create/components/create";
import Bookmarks from "@/components/card/Bookmarks";
export default function Page() {
  const boardObj = useAppSelector((state) => state.board.obj);
  const listId = useAppSelector((state) => state.list.id);
  const listName = useAppSelector((state) => state.list.name);
  const dispatch = useAppDispatch();
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
  // useEffect(() => {
  //   refetch();
  // }, [boardObj.id, refetch]);
  if (!boardObj) {
    return <div className="flex justify-center items-center">Select a board</div>;
  }
  if (isError || isLoadingError) {
    console.error(error);
  }
  if (isLoading) {
    return <div className="flex justify-center items-center">Loading lists....</div>;
  }
  if (isSuccess && isStale) {
    console.log("List data:",lists?.data)
    return (
      <div className="flex flex-col justify-center items-center  relative top-28 object-center w-full h-fit ">
        <div>{boardObj.name}</div>
        <Tabs mt={`2`} isFitted variant={`enclosed`}>
          <TabList>
            {lists?.data?.map((list: { id: string; name: string }) => (
              <Tab
                onClick={() => {
                  dispatch(setListId(list.id));
                  dispatch(setListName(list.name));
                }}
                key={list.id}
              >
                {list.name}
              </Tab>
            ))}
            <Tab>
              <Create parentId={boardObj.id} category={`lists`} mutationKey={`create list`} />
            </Tab>
          </TabList>
          <TabPanels flex={"1"} justifyContent={`center`} placeItems={"center"}>
            {lists?.data?.map((list: { id: string; name: string }) => (
              <TabPanel key={list.id}>
<Bookmarks listId={list.id} key={list.id}/>
                {/* {isLoading? <div>loading...</div>:(bookmarks?.data?.map()) } */}
              </TabPanel>
            ))}

            <CreateBookmark
              id={listId}
              mutationKey="create bookmark"
              category="bookmarks"
              listName={listName}
            />
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}
