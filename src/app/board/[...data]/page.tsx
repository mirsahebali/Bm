import { useFetchData } from "@/functions/query";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Bookmarks from "@/components/card/Bookmarks";
import Create from "@/components/create/components/create";
export default async function Page({ params }: { params: { data: string[] } }) {
  const [boardId, name] = params.data;
  const {
    data: lists,
    isError,
    isLoading,
    isSuccess,
    isStale,
    isLoadingError,
    refetch,
    error
  } = useFetchData(["lists"], `lists/read/${boardId}`);
  if (isLoading) {
   return <div>Loading...</div> 
  }
  if (isError) {
   console.error(error) 
  }
  if(isSuccess)
  return (
    <div className="flex flex-col justify-center items-center  relative top-28 object-center w-full h-fit ">
      <div>{name}</div>
      <Tabs mt={`2`} isFitted variant={`enclosed`}>
        <TabList>
          {lists?.data?.map((list: { id: string; name: string }) => (
            <Tab key={list.id}>{list.name}</Tab>
          ))}
          <Tab>
            <Create parentId={boardId} category={`lists`} mutationKey={`create list`} />
          </Tab>
        </TabList>
        <TabPanels flex={"1"} justifyContent={`center`} placeItems={"center"}>
          {lists?.data?.map((list: { id: string; name: string }) => (
            <TabPanel key={list.id}>
              <Bookmarks listId={list.id} key={list.id} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}
