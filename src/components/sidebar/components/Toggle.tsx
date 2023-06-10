"use client";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/features/themeSlice";
export default function Toggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    dispatch(toggleTheme(theme ==="dark"? "light": "dark"))
  };
  return (
    <button
      onClick={handleSwitchTheme}
      className="text-xl text-black dark:text-white"
    >
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
}
