import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Bottombar from "@/components/shared/Bottombar";
import Leftsidebar from "@/components/shared/LeftBar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata={
  title:"Threads",
  description:"Threads clone"
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Topbar />
          <main className="flex flex-row ">
          <Leftsidebar/>
          <section className="main-container">
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>
          <Rightsidebar/>
          </main>
        <Bottombar/>
        </ClerkProvider></body>
    </html>
  );
}
