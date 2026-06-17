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
      kontakt: "Kontakt",
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

  contact: {
    email: "vladresh09@gmail.com",
  },

  legal: {
    backHome: "← Zurück zur Startseite",
    contactCta: "Fragen oder Vorschläge?",
    contactEmailLabel: "Schreiben Sie uns:",
    impressum: {
      title: "Impressum",
      sections: [
        {
          heading: "Angaben gemäß § 5 DDG",
          body: "Vladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nZypern\n\nVertreten durch: Vladislav Reshetnikov",
        },
        {
          heading: "Kontakt",
          body: "E-Mail: {email}\n\nSchriftliche Anfragen beantworten wir in der Regel innerhalb weniger Werktage.",
        },
        {
          heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
          body: "Vladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nZypern",
        },
        {
          heading: "Verbraucherstreitbeilegung",
          body: "Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).\n\nHinweis: Die Plattform der Europäischen Kommission zur Online-Streitbeilegung (OS) wurde 2025 eingestellt; ein Link darauf entfällt daher. Sie erreichen uns direkt unter der oben genannten E-Mail-Adresse.",
        },
        {
          heading: "Haftung für Inhalte",
          body: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich (§ 7 Abs. 1 DDG). Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.",
        },
        {
          heading: "Haftung für Links",
          body: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.",
        },
        {
          heading: "Urheberrecht",
          body: "Die durch uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.",
        },
      ],
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      sections: [
        {
          heading: "1. Verantwortlicher und Rollen",
          body: "Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO für diese Website, das Dashboard und die Abrechnung ist:\nVladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nZypern\nE-Mail: {email}\n\nWichtige Abgrenzung: Für die Widerrufsdaten Ihrer Endkunden sind Sie — der Shop-Betreiber — der Verantwortliche, und wir handeln ausschließlich als Ihr Auftragsverarbeiter auf Grundlage eines Auftragsverarbeitungsvertrags (AVV, Art. 28 DSGVO). Für Ihre eigenen Konto- und Abrechnungsdaten sind wir der Verantwortliche.",
        },
        {
          heading: "2. Was diese Erklärung abdeckt",
          body: "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website und unseres Dienstes erforderlich ist, stets im Einklang mit der DSGVO. Diese Erklärung beschreibt, was wir beim Besuch der Website, beim Betrieb des Dashboards und beim Abschluss eines Abonnements verarbeiten — und wie wir mit den Widerrufsdaten umgehen, die Ihre Kunden über das Widget einreichen.",
        },
        {
          heading: "3. Rechtsgrundlagen (Art. 6 DSGVO)",
          body: "Wir stützen uns auf folgende Rechtsgrundlagen:\n• Vertragserfüllung / vorvertragliche Maßnahmen — Art. 6 Abs. 1 lit. b: Betrieb Ihres Kontos und des Dienstes.\n• Berechtigte Interessen — Art. 6 Abs. 1 lit. f: sicherer Betrieb, Hosting, Missbrauchsabwehr und Fehlerüberwachung.\n• Rechtliche Verpflichtung — Art. 6 Abs. 1 lit. c: gesetzliche Aufbewahrungspflichten (z. B. Steuerrecht).\n• Einwilligung — Art. 6 Abs. 1 lit. a: nur, wo wir ausdrücklich darum bitten (jederzeit widerrufbar).",
        },
        {
          heading: "4. Hosting und Server-Logfiles",
          body: "Die Website und die Service-API werden bei Vercel gehostet; die Anwendung läuft in der EU-Region fra1 (Frankfurt). Bei jedem Aufruf verarbeitet die Infrastruktur Server-Logdaten wie IP-Adresse, Datum und Uhrzeit, die abgerufene Ressource und den User-Agent — zum Zweck des sicheren und stabilen Betriebs (Art. 6 Abs. 1 lit. f DSGVO).",
        },
        {
          heading: "5. Konto und Anmeldung (Dashboard)",
          body: "Zur Nutzung des Dashboards melden Sie sich mit Ihrer E-Mail-Adresse über einen Einmalcode / Magic-Link an (passwortlos). Die Authentifizierung übernimmt Supabase. Wir verarbeiten Ihre E-Mail-Adresse und Authentifizierungs-Metadaten zum Betrieb Ihres Kontos (Art. 6 Abs. 1 lit. b DSGVO).",
        },
        {
          heading: "6. Daten des Widerrufs-Widgets (Verarbeitung im Auftrag des Shops)",
          body: "Wenn ein Endkunde über das Widget einen Widerruf einreicht, verarbeiten wir dessen Namen, E-Mail-Adresse und Bestellnummer, um die gesetzlich vorgeschriebene Bestätigung (§ 356a BGB) auf einem dauerhaften Datenträger (§ 126b BGB) zu erstellen. Name und E-Mail werden mit AES-256-GCM verschlüsselt gespeichert; nur die Bestellnummer wird im Klartext gespeichert. Die IP-Adresse des Besuchers wird transient zur Ratenbegrenzung genutzt und nicht in identifizierbarer Form gespeichert; wird eine IP zu Auditzwecken erfasst, geschieht dies anonymisiert. Wir verarbeiten diese Daten ausschließlich als Ihr Auftragsverarbeiter auf Grundlage des AVV, den Sie im Dashboard einsehen und akzeptieren können.",
        },
        {
          heading: "7. E-Mail-Versand (dauerhafter Datenträger)",
          body: "Bestätigungs-E-Mails werden über Resend als dauerhafter Datenträger gemäß § 126b BGB versendet. Die E-Mail-Adresse des Empfängers und der Nachrichteninhalt werden ausschließlich zur Zustellung der Bestätigung verarbeitet; der EU-Versand ist in der Provider-Konfiguration festgelegt.",
        },
        {
          heading: "8. Zahlungsabwicklung (LemonSqueezy als Merchant of Record)",
          body: "Zahlungen werden über LemonSqueezy abgewickelt, das als Merchant of Record auftritt. Das bedeutet: LemonSqueezy ist der Verkäufer im Rechtssinne — es zieht die Zahlung ein, stellt die Rechnung aus und führt USt./Steuern in eigener Verantwortung ab. Beim Checkout übergeben wir lediglich eine interne Organisations-Kennung (org_id). Zurück erhalten wir den Abo-Status, den Tarif, die Abrechnungs-E-Mail-Adresse sowie eine Kunden-/Abonnement-ID — gerade so viel, wie nötig ist, um Ihr Widget zu aktivieren oder zu deaktivieren. Vollständige Kartendaten erhalten oder speichern wir nicht. Die von Ihnen eingegebenen Zahlungs- und Abrechnungsdaten verarbeitet LemonSqueezy nach seiner eigenen Datenschutzerklärung: https://www.lemonsqueezy.com/privacy. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
        },
        {
          heading: "9. Auftragsverarbeiter und Subprozessoren",
          body: "Wir setzen folgende Dienstleister ein. Mit jedem schließen wir einen Auftragsverarbeitungsvertrag (AVV/DPA); soweit ein Anbieter Daten außerhalb der EU/des EWR verarbeiten kann, werden Übermittlungen durch die EU-Standardvertragsklauseln (SCC) abgesichert.\n\n• Vercel — Hosting & Auslieferung der App/API (Ausführungsregion fra1, Frankfurt, EU; Unternehmen mit Sitz in den USA) → AVV + SCC.\n• Supabase — Datenbank & Authentifizierung, inkl. verschlüsselter PII und Kontodaten (EU-Region; Unternehmen mit Sitz in den USA) → AVV + SCC.\n• Resend — Versand transaktionaler E-Mails (EU-Versand konfiguriert; Anbieter mit Sitz in den USA) → AVV + SCC.\n• Upstash — Ratenbegrenzung (Redis); IP wird transient verarbeitet und nicht gespeichert (EU-Region) → AVV, SCC sofern einschlägig.\n• Sentry — Fehler- und Performance-Überwachung (USA) → AVV + SCC.\n• LemonSqueezy — Zahlungsabwicklung / Merchant of Record (USA); eigener Verantwortlicher für Zahlungsdaten → siehe Abschnitt 8, SCC bei Übermittlung.\n• DigiCert (Zeitstempeldienst, RFC 3161) — qualifizierter Zeitstempel ausschließlich des täglichen Merkle-Roots; es werden keine personenbezogenen Daten übermittelt, nur ein kryptografischer Hash (USA).",
        },
        {
          heading: "10. Cookies und lokale Speicherung",
          body: "Wir verwenden keine Werbe- oder Tracking-Cookies und erstellen keine Profile. Wir nutzen lediglich:\n• ein Sprach-Cookie („lang“, Gültigkeit ca. 1 Jahr), das Ihre DE/EN-Auswahl merkt und im localStorage Ihres Browsers gespiegelt wird;\n• technisch notwendige Authentifizierungs-Cookies, die Supabase bei der Anmeldung am Dashboard setzt, einschließlich eines temporären PKCE-Login-Cookies.\nDiese sind technisch erforderlich bzw. vertragsbezogen (Art. 6 Abs. 1 lit. f und b DSGVO), sodass hierfür kein Einwilligungsbanner notwendig ist.",
        },
        {
          heading: "11. Speicherdauer und Löschung",
          body: "Konto- und Abrechnungsdaten werden für die Dauer des Abonnements und so lange aufbewahrt, wie gesetzliche Aufbewahrungsfristen es erfordern (z. B. Steuerrecht). Widerrufsdatensätze werden nach der konfigurierten Aufbewahrungsfrist (standardmäßig 180 Tage) automatisch anonymisiert; der kryptografische Hash bleibt erhalten, sodass der Nachweis ohne personenbezogene Daten nachprüfbar bleibt.",
        },
        {
          heading: "12. Ihre Rechte",
          body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine erteilte Einwilligung mit Wirkung für die Zukunft zu widerrufen. Außerdem haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Zur Ausübung Ihrer Rechte wenden Sie sich an: {email}.\n\nFür Endkunden-Widerrufsdaten wenden Sie sich bitte an den Shop, bei dem Sie bestellt haben — dieser Shop ist der Verantwortliche, und wir unterstützen ihn als sein Auftragsverarbeiter.",
        },
        {
          heading: "13. Datensicherheit",
          body: "Alle Verbindungen sind per TLS verschlüsselt. Personenbezogene Daten im Widerrufs-Log werden zusätzlich auf Feldebene mit AES-256-GCM verschlüsselt, Daten werden in der EU gehostet, und der Zugriff ist auf das technisch Notwendige beschränkt.",
        },
        {
          heading: "14. Kontakt zum Datenschutz",
          body: "Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie uns unter: {email}.",
        },
      ],
    },
  },
};
