import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple CRUD CMS",
  description: "Test project from YT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-5xl mx-auto">
          <header className="p-6 border-b flex items-center justify-between bg-red-600 text-white rounded-md">
            <Link className="text-2xl font-bold" href="/">
              Simple CRUD CMS
            </Link>
            <Link className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md text-black" href="/create">
              Add Post
            </Link>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
