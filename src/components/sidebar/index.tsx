"use client";
import Toggle from "./components/Toggle";
import Boards from "./components/Boards";
import Button from "./components/Button";
import DarkSvgLogo from "@/../public/Svg-01.svg";
import LightSvgLogo from "@/../public/Svg-02.svg";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import CreateBoard from "../create/boards";
import { Session } from "next-auth";
import { DeleteBoard } from "../boards/delete";
export default function Sidebar({
  session,
}: {
  session: Session | null | undefined;
}) {
  const theme = useAppSelector((store: RootState) => store.theme);

  return (
    <div className=" mr-3 my-2 p-10 rounded-r-xl h-screen flex flex-col items-center dark:bg-[#064663] ">
      <Toggle />
      <div>
        {/* <SvgLogo/> */}
        <div className="flex justify-center ">
          <Link href={`https://atomichouse.co`} target="_blank">
            <Image
              src={theme.theme === "dark" ? LightSvgLogo : DarkSvgLogo}
              alt="logo"
              height={40}
              width={40}
            />
          </Link>
        </div>

        {session ? (
          <div className="flex flex-col justify-center items-center">
            <div> Hello! </div>
            {session.user?.name}{" "}
          </div>
        ) : (
          <Button type="login" />
        )}
      </div>
      <Link href={`/`} className="text-4xl font-bold my-10 dark:text-white">
        Manager
      </Link>
      <div className="w-full h-[1px]  bg-gray-600"></div>
      <div>
        <Boards />
        <CreateBoard />
      </div>
      <div className="absolute bottom-0">
        <DeleteBoard />
      </div>
    </div>
  );
}
