import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Widerrufsbutton DACH",
  description: "§ 356a BGB compliant withdrawal widget & tamper-evident audit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
