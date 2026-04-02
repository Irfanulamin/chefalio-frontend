import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { twMerge } from "tailwind-merge";
import { MainLayoutProvider } from "../components/providers/MainLayoutProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chefalio",
  description:
    "Chefalio is a recipe sharing platform and cookbook selling website built with Next.js 13, Shadcn and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={twMerge(dmSans.className, "antialiased")}
      suppressHydrationWarning
    >
      <body>
        <MainLayoutProvider>{children}</MainLayoutProvider>
      </body>
    </html>
  );
}
