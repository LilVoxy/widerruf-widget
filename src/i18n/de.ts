/**
 * German dictionary. Typed against `Dict` (from en.ts) so it must provide the
 * exact same keys as the English source of truth.
 *
 * Legal wording is kept precise: § 356a BGB, § 126b BGB („dauerhafter
 * Datenträger“), DSGVO, AVV (Auftragsverarbeitungsvertrag, Art. 28 DSGVO).
 */
import type { Dict } from "./en";

export const de: Dict = {
  common: {
    appName: "Widerrufsbutton DACH",
    goToDashboard: "Zum Dashboard",
    copy: "Kopieren",
    copied: "Kopiert",
  },

  lang: {
    label: "Sprache",
    en: "EN",
    de: "DE",
  },

  nav: {
    overview: "Übersicht",
    logs: "Widerrufs-Log",
    settings: "Einstellungen",
    signOut: "Abmelden",
    signingOut: "Abmelden…",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    brandSub: "DACH · § 356a BGB",
    hosting: "EU-Hosting · Frankfurt",
  },

  landing: {
    nav: {
      why: "Vorteile",
      how: "So funktioniert's",
      pricing: "Preis",
      install: "Integration",
      faq: "FAQ",
    },
    hero: {
      badge: "§ 356a BGB · DSGVO · EU-Hosting Frankfurt",
      title: "Der gerichtsfeste Widerrufs-Button für Ihren Shop",
      subtitle:
        "Ein einbettbares Widget für den Verbraucher-Widerruf — mit manipulationssicherem kryptografischem Audit: SHA-256 → Merkle-Baum → RFC 3161-Zeitstempel. In Minuten integriert, DSGVO-konform, gehostet in Frankfurt.",
      ctaPrimary: "Zum Dashboard",
      ctaSecondary: "Wie es funktioniert",
      pipeline: ["Widerruf", "SHA-256", "Merkle-Baum", "RFC 3161"],
    },
    why: {
      title: "Warum Widerrufsbutton DACH",
      subtitle:
        "Alles, um Verbraucher-Widerrufe rechtssicher zu protokollieren — ohne Eingriff in das Theme Ihres Shops.",
      items: [
        {
          title: "Gerichtsfester Nachweis",
          text: "Jeder Widerruf wird zum unveränderlichen Nachweis: SHA-256-Fingerabdruck → Merkle-Baum → qualifizierter RFC 3161-Zeitstempel (gerichtsfest).",
        },
        {
          title: "Rechtssicherheit ab Werk",
          text: "Konform mit § 356a BGB und § 126b BGB (dauerhafter Datenträger) ab dem ersten Widerruf — ohne juristischen Mehraufwand.",
        },
        {
          title: "DSGVO by Design",
          text: "PII per AES-256-GCM verschlüsselt, AVV nach Art. 28 DSGVO, automatische Löschfristen, EU-Hosting in Frankfurt.",
        },
        {
          title: "Installation in 5 Minuten",
          text: "Ein einziger ≤5 KB Script-Tag in einer geschlossenen Shadow DOM. Kein Konflikt mit dem CSS oder Theme Ihres Shops.",
        },
        {
          title: "Transparenter Preis",
          text: "Ein Pauschaltarif zu 9 €/Monat. Keine Einrichtungsgebühr, keine Kosten pro Anfrage, keine versteckten Gebühren.",
        },
        {
          title: "Gemacht für die DACH-Region",
          text: "Entwickelt für das E-Commerce-Recht in Deutschland, Österreich und der Schweiz — das Widget spricht standardmäßig Deutsch.",
        },
      ],
    },
    how: {
      title: "Wie es funktioniert",
      subtitle:
        "Jeder Widerruf wird in vier Schritten zu einem gerichtsfesten, unveränderlichen Nachweis.",
      steps: [
        {
          title: "1 · Widerruf",
          text: "Der Verbraucher widerruft mit drei Feldern (Name, Bestell-Nr., E-Mail) direkt im Shop — ohne Begründung, ohne Marketing-Opt-in.",
        },
        {
          title: "2 · SHA-256",
          text: "Aus dem kanonischen Datensatz wird ein reproduzierbarer SHA-256-Fingerabdruck gebildet — fälschungssicher und jederzeit nachprüfbar.",
        },
        {
          title: "3 · Merkle-Baum",
          text: "Alle Fingerabdrücke eines Tages werden zu einem Merkle-Root zusammengefasst — ein einziger Wurzel-Hash sichert sämtliche Einträge.",
        },
        {
          title: "4 · RFC 3161",
          text: "Der Merkle-Root wird durch einen qualifizierten Zeitstempel (RFC 3161) verankert — gerichtsfester Nachweis von Eingang und Zeit.",
        },
      ],
    },
    compare: {
      title: "Vorher & nachher",
      subtitle: "Vom riskanten manuellen Prozess zum automatischen notariellen Log.",
      beforeTitle: "Manueller Prozess",
      afterTitle: "Mit Widerrufsbutton DACH",
      before: [
        "Widerrufe verstreut in E-Mail-Postfächern",
        "Kein verlässlicher Nachweis von Eingang oder Zeitpunkt",
        "PII unverschlüsselt in Tabellen gespeichert",
        "Manuelle Löschfristen — leicht verpasst",
        "Streitfälle schwer gerichtlich zu belegen",
      ],
      after: [
        "Jeder Widerruf in einem manipulationssicheren Log erfasst",
        "RFC 3161-Zeitstempel belegt Eingang und exakte Zeit",
        "PII per AES-256-GCM verschlüsselt, AVV inklusive",
        "Automatische, auditierte Löschung nach Frist",
        "Gerichtsfestes Beweispaket als ZIP exportierbar",
      ],
    },
    pricing: {
      title: "Einfacher, transparenter Preis",
      subtitle: "Ein Tarif mit allem inklusive. Jederzeit kündbar.",
      planName: "Professional",
      price: "9 €",
      period: "/ Monat",
      features: [
        "Unbegrenzte Widerrufe",
        "Gerichtsfeste RFC 3161-Zeitstempel",
        "AES-256-GCM PII-Verschlüsselung",
        "AVV (Art. 28 DSGVO) inklusive",
        "EU-Hosting in Frankfurt",
        "ZIP-Beweisexport",
      ],
      cta: "Jetzt starten",
      note: "Keine Einrichtungsgebühr · keine versteckten Kosten · jederzeit kündbar",
    },
    integration: {
      title: "Auf jeder Plattform integrieren",
      subtitle:
        "Fügen Sie einen Script-Tag vor </body> ein. Wählen Sie Ihre Plattform für eine Schritt-für-Schritt-Anleitung.",
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        {
          q: "Was ist die rechtliche Grundlage?",
          a: "Der Dienst unterstützt das gesetzliche Widerrufsrecht nach § 356a BGB und stellt die Bestätigung auf einem dauerhaften Datenträger gemäß § 126b BGB bereit. Die Verarbeitung der PII ist durch einen AVV (Art. 28 DSGVO) abgedeckt.",
        },
        {
          q: "Wo und wie werden Daten gespeichert?",
          a: "Alle Daten werden ausschließlich in der EU gehostet (Frankfurt, eu-central-1). Personenbezogene Daten werden auf Feldebene mit AES-256-GCM verschlüsselt.",
        },
        {
          q: "Wie werden Daten gelöscht?",
          a: "Personenbezogene Daten werden nach der konfigurierten Aufbewahrungsfrist automatisch anonymisiert. Der kryptografische Nachweis (Hash) bleibt erhalten, sodass der Eintrag ohne PII nachprüfbar bleibt.",
        },
        {
          q: "Welche Plattformen werden unterstützt?",
          a: "Jede Website, in die ein Script-Tag eingefügt werden kann: Shopware 6, JTL-Shop, Shopify, WooCommerce/WordPress, Wix, Squarespace, Webflow, Google Tag Manager und individuelles HTML.",
        },
        {
          q: "Beeinflusst das Widget das Design meines Shops?",
          a: "Nein. Das Widget rendert in einer geschlossenen Shadow DOM mit all:initial — das CSS Ihres Themes kann nicht eindringen und das Widget nicht nach außen wirken.",
        },
        {
          q: "Kann ich jederzeit kündigen?",
          a: "Ja. Der Tarif kostet 9 €/Monat ohne Mindestlaufzeit. Das Widget wird nicht mehr angezeigt, sobald das Abonnement nicht mehr aktiv ist.",
        },
        {
          q: "Wie lange dauert die Installation?",
          a: "Etwa fünf Minuten. Script-Tag kopieren, vor </body> einfügen — der Button erscheint, sobald Ihr Abonnement aktiv ist.",
        },
      ],
    },
    finalCta: {
      title: "Starten Sie mit rechtssicheren Widerrufen",
      subtitle:
        "Richten Sie Ihre Organisation ein, kopieren Sie das Snippet und integrieren Sie den Widerrufs-Button in wenigen Minuten.",
      cta: "Zum Dashboard",
    },
    footer: {
      tagline: "§ 356a BGB-konform · EU-Hosting (Frankfurt)",
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      hosting: "EU-Hosting · Frankfurt",
    },
  },

  integration: {
    beforeBody: "Fügen Sie diesen Tag vor </body> ein:",
    placeholderNote:
      "Ersetzen Sie YOUR_API_KEY durch den Schlüssel aus Ihrem Dashboard, sobald Ihr Abonnement aktiv ist.",
    platforms: [
      {
        id: "shopware",
        name: "Shopware 6",
        steps: [
          "Öffnen Sie Administration → Einstellungen → Theme (oder Ihr Custom-Theme).",
          "Bearbeiten Sie das Storefront-Footer-Template (base.html.twig / footer).",
          "Fügen Sie das Snippet direkt vor dem schließenden </body>-Tag ein.",
          "Leeren Sie den Cache und laden Sie die Storefront neu.",
        ],
      },
      {
        id: "jtl",
        name: "JTL-Shop",
        steps: [
          "Öffnen Sie die Einstellungen Ihres aktiven Templates im JTL-Shop-Admin.",
          "Öffnen Sie den Footer-/Custom-Code-Bereich (oder bearbeiten Sie Templates/.../footer).",
          "Fügen Sie das Snippet vor </body> ein.",
          "Speichern und leeren Sie den Template-Cache.",
        ],
      },
      {
        id: "shopify",
        name: "Shopify",
        steps: [
          "Öffnen Sie Onlineshop → Themes → … → Code bearbeiten.",
          "Öffnen Sie Layout/theme.liquid.",
          "Fügen Sie das Snippet direkt vor </body> ein.",
          "Speichern Sie die Datei.",
        ],
      },
      {
        id: "woocommerce",
        name: "WooCommerce / WordPress",
        steps: [
          "Am einfachsten: Plugin wie „Insert Headers and Footers“ installieren.",
          "Fügen Sie das Snippet in das Feld „Footer“ / „Body-Ende“ ein.",
          "Alternativ per wp_footer-Hook in die footer.php einfügen.",
          "Änderungen speichern.",
        ],
      },
      {
        id: "custom",
        name: "Custom HTML",
        steps: [
          "Öffnen Sie das Haupt-HTML-Template Ihrer Website.",
          "Fügen Sie das Snippet direkt vor </body> ein.",
          "Deployen / laden Sie die Datei hoch.",
        ],
      },
      {
        id: "wix",
        name: "Wix",
        steps: [
          "Gehen Sie zu Einstellungen → Eigener Code.",
          "Fügen Sie neuen Code hinzu und tragen Sie das Snippet ein.",
          "Platzierung auf „Body – Ende“ setzen, für alle Seiten anwenden.",
          "Speichern und veröffentlichen.",
        ],
      },
      {
        id: "squarespace",
        name: "Squarespace",
        steps: [
          "Gehen Sie zu Einstellungen → Erweitert → Code Injection.",
          "Fügen Sie das Snippet in das Feld „Footer“ ein.",
          "Speichern.",
        ],
      },
      {
        id: "webflow",
        name: "Webflow",
        steps: [
          "Öffnen Sie Project Settings → Custom Code.",
          "Fügen Sie das Snippet in das Feld „Footer Code“ ein.",
          "Speichern und Website veröffentlichen.",
        ],
      },
      {
        id: "gtm",
        name: "Google Tag Manager",
        steps: [
          "Erstellen Sie einen neuen Tag → „Benutzerdefiniertes HTML“.",
          "Fügen Sie das Snippet in das HTML-Feld ein.",
          "Setzen Sie den Trigger auf „Alle Seiten“.",
          "Container senden und veröffentlichen.",
        ],
      },
    ],
  },

  overview: {
    title: "Übersicht",
    welcome: "Willkommen bei Widerrufsbutton DACH.",
    yourOrg: "Ihre Organisation",
    stats: {
      total: "Widerrufe gesamt",
      last30: "Letzte 30 Tage",
      pending: "TSA ausstehend",
    },
    noOrg: {
      title: "Organisation noch nicht angelegt",
      text: "Legen Sie zuerst Ihre Stammdaten an, um das Widget zu konfigurieren und Widerrufe rechtssicher zu protokollieren.",
      cta: "Zu den Einstellungen",
    },
    avv: {
      title: "Auftragsverarbeitungsvertrag (AVV)",
      acceptedAt: "Akzeptiert am {date}",
      notAccepted: "Noch nicht akzeptiert (Art. 28 DSGVO).",
      acceptInSettings: "In den Einstellungen akzeptieren →",
    },
  },

  integrationCard: {
    title: "Integration",
    subscription: "Abo",
    gateNote:
      "Das Snippet wird angezeigt, sobald ein aktives Abonnement vorliegt (subscription_status = 'active').",
    subscribe: "Subscribe — 9 €/Monat",
  },

  logs: {
    title: "Widerrufs-Log",
    subtitle: "Manipulationssicheres Protokoll aller eingegangenen Widerrufe.",
    entries: "{count} Einträge",
    pageOf: "Seite {page}/{total}",
    empty: {
      title: "Noch keine Widerrufe",
      text: "Sobald über das Widget ein Widerruf eingeht, erscheint er hier mit kryptografischem Nachweis.",
    },
    th: {
      date: "Datum",
      order: "Order-ID",
      email: "E-Mail",
      proof: "Nachweis (SHA-256)",
      tsa: "TSA",
    },
    anonymized: "— (anonymisiert)",
    status: {
      pending: "ausstehend",
      anchored: "verankert",
    },
    back: "← Zurück",
    next: "Weiter →",
    zip: "ZIP",
  },

  settings: {
    title: "Einstellungen",
    subtitle: "Stammdaten, Auftragsverarbeitung und Abonnement verwalten.",
    masterData: {
      title: "Stammdaten",
      name: "Shop-/Firmenname",
      domains: "Erlaubte Domains (CORS-Whitelist, kommagetrennt)",
      domainsPlaceholder: "shop.de, www.shop.de",
      impressum: "Impressum (erscheint im Quittungs-Footer) *",
      save: "Speichern",
      create: "Organisation anlegen",
    },
    avv: {
      title: "Auftragsverarbeitungsvertrag (AVV)",
      acceptedAt: "Akzeptiert am {date}",
      consent:
        "Ich akzeptiere den Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Zeitpunkt und anonymisierte IP werden zu Auditzwecken gespeichert.",
      accept: "AVV akzeptieren",
      needOrg: "Bitte zuerst die Organisation anlegen.",
    },
    subscription: {
      title: "Abonnement",
      status: "Status:",
      subscribe: "Subscribe — 9 €/Monat",
      snippetHint: "Das Integrations-Snippet finden Sie unter „Übersicht“.",
    },
    saved: "Gespeichert.",
    error: "Fehler: ",
    unknown: "unbekannt",
    avvAcceptedAt: "AVV akzeptiert am ",
  },
};
