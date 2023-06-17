"use client";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  BsFillBookmarkFill,
  BsFillClipboard2Fill,
  BsReverseListColumnsReverse,
  BsTrashFill,
} from "react-icons/bs";
import { Fragment } from "react";
import Link from "next/link";
const routes = [
  {
    name: "Boards",
    href: "/trash/boards",
    icon: BsFillClipboard2Fill,
  },
  {
    name: "List",
    href: "/trash/lists",
    icon: BsReverseListColumnsReverse,
  },
  {
    name: "Bookmarks",
    href: "/trash/bookmarks",
    icon: BsFillBookmarkFill,
  },
];

export default function Trash() {
  return (
    <div className="w-full max-w-sm px-4 mt-1">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>
                <BsTrashFill />
              </span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="dark:bg-gray-900 absolute left-1/2 z-10 mt-3 w-fit max-w-sm -translate-x-1/2 transform px-0.5 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative  p-1 lg:grid-cols-3">
                    {routes.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="m-3 flex items-center rounded-lg p-2 transition duration-150 dark:hover:text-black ease-in-out hover:bg-gray-500  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                          <item.icon
                            className="h-6 w-6 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium  dark:text-white">
                            {item.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
