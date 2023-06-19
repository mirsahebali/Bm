import { useFetchData } from "@/functions/query";
import Link from "next/link";
import { useEffect } from "react";

export default function Bookmarks({ listId }: { listId: string }) {
  const {
    data: bookmarks,
    isError,
    isLoading,
    isLoadingError,
    isSuccess,
    refetch,
    error,
  } = useFetchData("bookmarks", `bookmarks/${listId}`);
  useEffect(() => {
    refetch();
  }, [listId, isSuccess, refetch]);
  if (isLoading) return <div>Loading...</div>;
  if (isError || isLoadingError) {
    console.error(error);
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col">
      {bookmarks.map((bookmark: any) => {
        const url = new URL(bookmark.url).hostname;
        const favicon = `https://www.google.com/s2/favicons?domain=${url}&sz=${20}`;
        return (
          <Link href={bookmark.url} key={bookmark.id}>
            <div>
              <img src={favicon} alt={bookmark.title} width={20} height={20} />
            </div>{" "}
            <div> {bookmark.name != "card" && bookmark.name ? bookmark.name : bookmark.title}</div>
          </Link>
        );
      })}
    </div>
  );
}
