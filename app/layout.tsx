import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firebase Auth",
  description: "Working on Firebase and NextJS Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
