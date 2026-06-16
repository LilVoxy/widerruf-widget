import Link from "next/link";
import {
  ShieldCheck,
  FileSignature,
  Hash,
  Network,
  Stamp,
  Lock,
  Server,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const steps = [
    {
      icon: FileSignature,
      title: "1 · Widerruf",
      text: "Der Verbraucher widerruft mit drei Feldern (Name, Bestell-Nr., E-Mail) direkt im Shop — ohne Begründung, ohne Marketing-Opt-in.",
    },
    {
      icon: Hash,
      title: "2 · SHA-256",
      text: "Aus dem kanonischen Datensatz wird ein reproduzierbarer SHA-256-Fingerabdruck gebildet — fälschungssicher und jederzeit nachprüfbar.",
    },
    {
      icon: Network,
      title: "3 · Merkle-Baum",
      text: "Alle Fingerabdrücke eines Tages werden zu einem Merkle-Root zusammengefasst — ein einziger Wurzel-Hash sichert sämtliche Einträge.",
    },
    {
      icon: Stamp,
      title: "4 · RFC 3161",
      text: "Der Merkle-Root wird durch einen qualifizierten Zeitstempel (RFC 3161) notariell verankert — gerichtsfester Nachweis von Eingang und Zeit.",
    },
  ];

  const trust = [
    { icon: ShieldCheck, title: "§ 356a BGB", text: "Rechtskonforme Widerrufsbelehrung und dauerhafter Datenträger gemäß § 126b BGB." },
    { icon: Lock, title: "DSGVO", text: "PII per AES-256-GCM verschlüsselt, AVV nach Art. 28, automatische Löschfristen." },
    { icon: Server, title: "EU-Hosting", text: "Datenhaltung ausschließlich in Frankfurt (eu-central-1)." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-semibold text-slate-900">Widerrufsbutton DACH</span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Zum Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          § 356a BGB · DSGVO · EU-Hosting Frankfurt
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Der rechtssichere Widerrufs-Button für Ihren Shop
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Ein einbettbares Widget für den Verbraucher-Widerruf — mit
          manipulationssicherem kryptografischem Audit: SHA-256 → Merkle-Baum →
          RFC&nbsp;3161-Zeitstempel. In Minuten integriert, DSGVO-konform,
          gehostet in Frankfurt.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Zum Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how"
            className="rounded-lg border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Wie es funktioniert
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900">Wie es funktioniert</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Jeder Widerruf wird in vier Schritten zu einem gerichtsfesten,
            unveränderlichen Nachweis.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {trust.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <Icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-brand-600">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">
            Starten Sie mit rechtssicheren Widerrufen
          </h2>
          <p className="max-w-xl text-brand-100">
            Richten Sie Ihre Organisation ein, kopieren Sie das Snippet und
            integrieren Sie den Widerrufs-Button in wenigen Minuten.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Zum Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-500">
          Widerrufsbutton DACH · § 356a BGB-konform · EU-Hosting (Frankfurt)
        </div>
      </footer>
    </div>
  );
}
