import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getServerLang } from "@/i18n/server";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Widerrufsbutton DACH",
  description: "§ 356a BGB compliant withdrawal widget & tamper-evident audit.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getServerLang();
  return (
    <html lang={lang} className={geist.variable}>
      <body className="min-h-screen font-sans antialiased">
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
