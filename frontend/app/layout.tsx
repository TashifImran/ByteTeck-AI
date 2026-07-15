import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ByteTeck AI",
  description: "Byteteck Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0D0D0D] text-white">
        {children}
      </body>
    </html>
  );
}