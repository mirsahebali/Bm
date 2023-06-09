"use client";
import Toggle from "./components/Toggle";
import Accordion from "./components/Accordion";
import { useSession } from "next-auth/react";
import Button from "./components/Button";
export default function Sidebar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className=" mr-3 my-2 p-10 rounded-r-xl h-screen flex flex-col items-center dark:bg-[#064663] ">
      <Toggle />
      <div>
        {session ? (
          <div className="flex flex-col justify-center items-center">
            <div> Hello! </div>
            {session.user?.name}{" "}
          </div>
        ) : (
          <Button type="login" />
        )}
      </div>
      <div className="text-4xl font-bold my-10 dark:text-white">Manager</div>
      <div className="w-full h-[1px]  bg-gray-600"></div>
      <div>
        <Accordion />
      </div>

      <Button type="logout" />
    </div >
  );
}
