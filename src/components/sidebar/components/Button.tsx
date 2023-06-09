"use client";
import { signIn, signOut } from "next-auth/react";
export default function Button({ type }: { type: "login" | "logout" }) {
  return (
    <button onClick={() => (type === "login" ? signIn() : signOut())}>
      {type === "login" ? "Login" : "Logout"}
    </button>
  );
}
