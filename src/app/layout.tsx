import "./globals.css";
import Sidebar from "@/components/sidebar/index";
import Providers from "./Providers";
export const metadata = {
  title: "Bookmark Manager - Atomic House",
  description: "Created by Mir Saheb Ali",
  icons: {
    icon: "../../public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`flex dark:bg-[#041C32] ease-in-out duration-300 dark:text-white`}
      >
        <Providers>
          <div className="w-[20%]">
            <Sidebar />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
