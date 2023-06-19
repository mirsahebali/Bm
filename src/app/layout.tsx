import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/index";
import Providers from "./Providers";
import Workspace from "@/components/workspaces";
import CreateWorkspace from "@/components/create/components/create";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { DeleteWorkspace } from "@/components/workspaces/components/Delete";
import Trash from "@/components/popover/trash";
import Search from "@/components/slide_up/search";
export const metadata = {
  title: "Bookmark Manager - Atomic House",
  description: "Created by Mir Saheb Ali",
  icons: {
    icon: "../../public/favicon.ico",
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session)
  return <div>login</div>;
 return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`flex dark:bg-[#041C32] ease-in-out duration-300 dark:text-white`}>
        <Providers>
          <div className="w-[20%] flex">
            <Sidebar session={session} />
            <Workspace user={session?.user?.email!} />
            <CreateWorkspace
              category="workspace"
              mutationKey="Create Workspace"
              parentId={"workspace"}
            />
            <DeleteWorkspace />
            <Trash />
            <Navbar />
            <div className="">
              <Search />
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
