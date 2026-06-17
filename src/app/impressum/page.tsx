import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Impressum · Widerrufsbutton DACH",
};

export default function ImpressumPage() {
  return <LegalDoc doc="impressum" />;
}
