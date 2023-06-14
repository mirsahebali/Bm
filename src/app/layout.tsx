import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/index";
import Providers from "./Providers";
import Workspace from "@/components/workspaces";
import CreateWorkspace from "@/components/create/workspace";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export const metadata = {
  title: "Bookmark Manager - Atomic House",
  description: "Created by Mir Saheb Ali",
  icons: {
    icon: "../../public/favicon.ico",
  },
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={`flex dark:bg-[#041C32] ease-in-out duration-300 dark:text-white`}
        >
          <Providers>
            <div className="w-[20%] flex">
              <Sidebar />
              <Navbar />
            </div>
            {children}
          </Providers>
        </body>
      </html>
    );
  }
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session?.user?.email,
    },
  });

  const ws = await prisma.workspace.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`flex dark:bg-[#041C32] ease-in-out duration-300 dark:text-white`}
      >
        <Providers>
          <div className="w-[20%] flex">
            <Sidebar />
            <Navbar />
            <Workspace workspaces={ws} />
            <CreateWorkspace user={user.id} />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
