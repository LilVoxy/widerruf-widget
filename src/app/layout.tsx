import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Widerrufsbutton DACH",
  description: "§ 356a BGB compliant withdrawal widget & tamper-evident audit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
          background: "#f1f5f9",
          color: "#0f172a",
        }}
      >
        {children}
      </body>
    </html>
  );
}
