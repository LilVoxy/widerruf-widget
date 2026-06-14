"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="de">
      <body style={{ fontFamily: "system-ui,Segoe UI,Arial,sans-serif", padding: 32 }}>
        <h1>Ein Fehler ist aufgetreten</h1>
        <p>Bitte laden Sie die Seite neu. / Please reload the page.</p>
      </body>
    </html>
  );
}
