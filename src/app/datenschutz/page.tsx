import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Datenschutz · Widerrufsbutton DACH",
};

export default function DatenschutzPage() {
  return <LegalDoc doc="datenschutz" />;
}
