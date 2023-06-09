"use client";
import Toggle from "./components/Toggle";
import Accordion from "./components/Accordion";
export default function Sidebar() {
  return (
    <div className=" m-3 p-10 rounded-xl  h-screen flex flex-col items-center dark:bg-[#064663] ">
      <Toggle />
      <div className="text-4xl font-bold my-10 dark:text-white">Boomager</div>
      <div className="w-full h-[1px]  bg-gray-600"></div>
      <div>
        <Accordion />
      </div>
    </div>
  );
}
