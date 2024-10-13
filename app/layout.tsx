import type { Metadata } from "next";
import localfont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "SMILE 2",
  description: "Generated by Maddict",
};

const gothicSerif = localfont({
  src: [
    {
      path: "./fonts/gothicSerif.ttf", // Relative path to the font in the app folder
      weight: "700",
    },
  ],
  variable: "--font-gothicSerif", // CSS variable for the font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gothicSerif.variable} antialiased`}>{children}</body>
    </html>
  );
}
