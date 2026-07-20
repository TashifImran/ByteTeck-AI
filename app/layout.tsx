import './globals.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ByteTeck",
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