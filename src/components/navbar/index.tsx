"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment} from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineLogin, AiFillEdit, AiOutlineLogout } from "react-icons/ai";
export default function Example() {
  const { data: session } = useSession();
  return (
    <div className=" w-56 text-right float-right absolute right-0">
      <Menu as="div" className="relative dark:border-gray-100 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Profile
            <Image
              src={
                "https://images.unsplash.com/photo-1568292342316-60aa3d36f4b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1337&q=80"
              }
              alt="image"
              width={30}
              height={30}
            />
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-blue-200 hover:text-blue-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>{() => <div className="dark:text-black">Hello</div>}</Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/profile`}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <AiFillEdit className="mr-2 h-5 w-5 text-gray-50" aria-hidden="true" />
                    ) : (
                      <AiFillEdit className="mr-2 h-5 w-5 text-blue-600" aria-hidden="true" />
                    )}
                    Edit Profile
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1"></div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => (session ? signOut() : signIn())}
                  >
                    {session ? (
                      active ? (
                        <AiOutlineLogout className="mr-2 h-5 w-5 text-gray-50" aria-hidden="true" />
                      ) : (
                        <AiOutlineLogout
                          className="mr-2 h-5 w-5 text-blue-400"
                          aria-hidden="true"
                        />
                      )
                    ) : active ? (
                      <AiOutlineLogin className="mr-2 h-5 w-5 text-gray-50" aria-hidden="true" />
                    ) : (
                      <AiOutlineLogout className="mr-2 h-5 w-5 text-blue-600" aria-hidden="true" />
                    )}
                    {session ? "Log out" : "Login"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}


