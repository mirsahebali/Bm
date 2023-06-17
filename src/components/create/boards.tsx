"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SyntheticEvent, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
export default function CreateBoard() {
  const wsId = useAppSelector((state) => state.workspace.id);
  const queryClient = useQueryClient();
  let [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const { refetch } = useQuery(["boards"]);
  const createBoardMutation = useMutation({
    mutationKey: ["create board"],
    mutationFn: async (e: SyntheticEvent) => {
      e.preventDefault();
      const data = await fetch(
        `http://localhost:3000/api/boards/create/${wsId}`,
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
      setIsOpen(false);
      queryClient.invalidateQueries(["boards"]);
      refetch();
      console.log("Successfully created board with ws id: %s", wsId);
    },
    onError: () => {
      console.log("Failed to create board with ws id: %s", wsId);
    },
  });
  return (
    <>
      <div className="inset-0 flex items-center h-fit">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a board
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      method="post"
                      onSubmit={createBoardMutation.mutateAsync}
                    >
                      <Input
                        color={"black"}
                        placeholder="add board"
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        id="name"
                      />

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Add
                        </button>

                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
