"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { setID as setWSId } from "@/features/workspaceSlice";
export default function Workspaces() {
  const dispatch = useAppDispatch();
  const {
    data: wsData,
    isError,
    error,
    isLoading,
    isLoadingError,
    refetch,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/ws/read", {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },
  });
  const [selected, setSelected] = useState(
    wsData ? wsData[0] : { name: "Select a workspace", id: "none" }
  );
  useEffect(() => {
    dispatch(setWSId(selected.id));
  }, [selected, dispatch]);

  if (isError || isLoadingError) {
    console.error(error);
    refetch();
  }
  if (isLoading) {
    return <div>Is loading...</div>;
  }

  return (
    <div className="relative w-[130%]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="dark:text-black text-white relative w-full cursor-default rounded-lg dark:bg-white bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black dark:text-black dark:bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {wsData?.data.map((ws: { name: string; id: string }) => (
                <Listbox.Option
                  key={ws.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 dark:text-black text-white ${
                      active ? "bg-slate-600 text-sky-50" : "text-gray-900"
                    }`
                  }
                  value={ws}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {ws.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
