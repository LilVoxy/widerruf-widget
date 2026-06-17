/**
 * English dictionary — the source of truth for the i18n type.
 * `de.ts` is typed against `Dict` so both locales always share the same keys.
 *
 * The embeddable widget is intentionally NOT covered here: it stays German for
 * legal reasons and lives in its own closed Shadow DOM bundle.
 */
export const en = {
  common: {
    appName: "Widerrufsbutton DACH",
    goToDashboard: "Go to Dashboard",
    copy: "Copy",
    copied: "Copied",
  },

  lang: {
    label: "Language",
    en: "EN",
    de: "DE",
  },

  nav: {
    overview: "Overview",
    logs: "Withdrawal Log",
    settings: "Settings",
    signOut: "Sign out",
    signingOut: "Signing out…",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    brandSub: "DACH · § 356a BGB",
    hosting: "EU hosting · Frankfurt",
  },

  landing: {
    nav: {
      why: "Why us",
      how: "How it works",
      pricing: "Pricing",
      install: "Install",
      faq: "FAQ",
    },
    hero: {
      badge: "§ 356a BGB · GDPR · EU hosting Frankfurt",
      title: "The court-proof withdrawal button for your shop",
      subtitle:
        "An embeddable widget for consumer withdrawals — backed by a tamper-evident cryptographic audit: SHA-256 → Merkle tree → RFC 3161 timestamp. Installed in minutes, GDPR-compliant, hosted in Frankfurt.",
      ctaPrimary: "Go to Dashboard",
      ctaSecondary: "See how it works",
      pipeline: ["Withdrawal", "SHA-256", "Merkle tree", "RFC 3161"],
    },
    why: {
      title: "Why choose us",
      subtitle:
        "Everything you need to make consumer withdrawals legally watertight — without touching your shop's theme.",
      items: [
        {
          title: "Court-proof evidence",
          text: "Every withdrawal becomes an immutable proof: SHA-256 fingerprint → Merkle tree → RFC 3161 qualified timestamp (gerichtsfest).",
        },
        {
          title: "Legal safety out of the box",
          text: "Compliant with § 356a BGB and § 126b BGB (durable medium) from the very first request — no legal homework.",
        },
        {
          title: "GDPR by design",
          text: "PII encrypted with AES-256-GCM, AVV under Art. 28, automatic retention deletion, EU hosting in Frankfurt.",
        },
        {
          title: "5-minute install",
          text: "A single ≤5 KB script tag in a closed Shadow DOM. It never conflicts with your shop's CSS or theme.",
        },
        {
          title: "Transparent pricing",
          text: "One flat plan at €9/month. No setup fees, no per-request charges, no hidden costs.",
        },
        {
          title: "Built for DACH",
          text: "Made for German, Austrian and Swiss e-commerce law — the widget speaks German to your customers by default.",
        },
      ],
    },
    how: {
      title: "How it works",
      subtitle:
        "Each withdrawal turns into a court-proof, immutable record in four steps.",
      steps: [
        {
          title: "1 · Withdrawal",
          text: "The consumer withdraws with three fields (name, order no., e-mail) right inside your shop — no reason, no marketing opt-in.",
        },
        {
          title: "2 · SHA-256",
          text: "A reproducible SHA-256 fingerprint is built from the canonical record — forgery-proof and verifiable at any time.",
        },
        {
          title: "3 · Merkle tree",
          text: "All fingerprints of a day are aggregated into a single Merkle root that secures every entry at once.",
        },
        {
          title: "4 · RFC 3161",
          text: "The Merkle root is anchored by a qualified timestamp (RFC 3161) — court-proof evidence of receipt and time.",
        },
      ],
    },
    compare: {
      title: "Before & after",
      subtitle: "From a risky manual process to an automatic notarized log.",
      beforeTitle: "Manual process",
      afterTitle: "With Widerrufsbutton DACH",
      before: [
        "Withdrawals scattered across e-mail inboxes",
        "No reliable proof of receipt or timing",
        "PII stored unencrypted in spreadsheets",
        "Manual deletion deadlines — easily missed",
        "Disputes hard to defend in court",
      ],
      after: [
        "Every withdrawal captured in one tamper-evident log",
        "RFC 3161 timestamp proves receipt and exact time",
        "PII encrypted with AES-256-GCM, AVV included",
        "Automatic, audited retention deletion",
        "Court-proof evidence package exportable as ZIP",
      ],
    },
    pricing: {
      title: "Simple, transparent pricing",
      subtitle: "One plan with everything included. Cancel anytime.",
      planName: "Professional",
      price: "€9",
      period: "/ month",
      features: [
        "Unlimited withdrawals",
        "Court-proof RFC 3161 timestamps",
        "AES-256-GCM PII encryption",
        "AVV (Art. 28 GDPR) included",
        "EU hosting in Frankfurt",
        "ZIP evidence export",
      ],
      cta: "Get started",
      note: "No setup fees · no hidden costs · cancel anytime",
    },
    integration: {
      title: "Install on any platform",
      subtitle:
        "Add one script tag before </body>. Pick your platform for step-by-step instructions.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "What is the legal basis?",
          a: "The service supports the statutory right of withdrawal under § 356a BGB and provides confirmation on a durable medium per § 126b BGB. PII processing is covered by an AVV (Art. 28 GDPR).",
        },
        {
          q: "Where and how is data stored?",
          a: "All data is hosted exclusively in the EU (Frankfurt, eu-central-1). Personal data is encrypted at the field level with AES-256-GCM.",
        },
        {
          q: "How is data deleted?",
          a: "Personal data is automatically anonymized after the configured retention period. The cryptographic proof (hash) remains, so the record stays verifiable without exposing PII.",
        },
        {
          q: "Which platforms are supported?",
          a: "Any website where you can add a script tag: Shopware 6, JTL-Shop, Shopify, WooCommerce/WordPress, Wix, Squarespace, Webflow, Google Tag Manager and custom HTML.",
        },
        {
          q: "Does the widget affect my shop's design?",
          a: "No. The widget renders in a closed Shadow DOM with all:initial, so your theme's CSS can't leak in and the widget can't leak out.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes. The plan is €9/month with no minimum term. The widget stops rendering as soon as the subscription is no longer active.",
        },
        {
          q: "How long does installation take?",
          a: "About five minutes. Copy the script tag, paste it before </body>, and the button appears once your subscription is active.",
        },
      ],
    },
    finalCta: {
      title: "Start logging withdrawals the safe way",
      subtitle:
        "Set up your organization, copy the snippet, and integrate the withdrawal button in minutes.",
      cta: "Go to Dashboard",
    },
    footer: {
      tagline: "§ 356a BGB compliant · EU hosting (Frankfurt)",
      impressum: "Imprint",
      datenschutz: "Privacy",
      kontakt: "Contact",
      hosting: "EU hosting · Frankfurt",
    },
  },

  integration: {
    beforeBody: "Add this tag before </body>:",
    placeholderNote:
      "Replace YOUR_API_KEY with the key from your dashboard once your subscription is active.",
    platforms: [
      {
        id: "shopware",
        name: "Shopware 6",
        steps: [
          "Open Administration → Settings → Theme (or your custom theme).",
          "Edit the Storefront footer template (base.html.twig / footer).",
          "Paste the snippet just before the closing </body> tag.",
          "Clear the cache and reload your storefront.",
        ],
      },
      {
        id: "jtl",
        name: "JTL-Shop",
        steps: [
          "Go to your active template's settings in the JTL-Shop admin.",
          "Open the footer / custom-code section (or edit Templates/.../footer).",
          "Insert the snippet before </body>.",
          "Save and clear the template cache.",
        ],
      },
      {
        id: "shopify",
        name: "Shopify",
        steps: [
          "Open Online Store → Themes → … → Edit code.",
          "Open Layout/theme.liquid.",
          "Paste the snippet right before </body>.",
          "Save the file.",
        ],
      },
      {
        id: "woocommerce",
        name: "WooCommerce / WordPress",
        steps: [
          "Easiest: install a plugin like “Insert Headers and Footers”.",
          "Paste the snippet into the “Footer” / “Body end” field.",
          "Alternatively add it to footer.php via the wp_footer hook.",
          "Save changes.",
        ],
      },
      {
        id: "custom",
        name: "Custom HTML",
        steps: [
          "Open your site's main HTML template.",
          "Paste the snippet immediately before </body>.",
          "Deploy / upload the file.",
        ],
      },
      {
        id: "wix",
        name: "Wix",
        steps: [
          "Go to Settings → Custom Code.",
          "Add new custom code and paste the snippet.",
          "Set placement to “Body - end” and apply to all pages.",
          "Save and publish.",
        ],
      },
      {
        id: "squarespace",
        name: "Squarespace",
        steps: [
          "Go to Settings → Advanced → Code Injection.",
          "Paste the snippet into the “Footer” field.",
          "Save.",
        ],
      },
      {
        id: "webflow",
        name: "Webflow",
        steps: [
          "Open Project Settings → Custom Code.",
          "Paste the snippet into the “Footer Code” field.",
          "Save and publish your site.",
        ],
      },
      {
        id: "gtm",
        name: "Google Tag Manager",
        steps: [
          "Create a new Tag → “Custom HTML”.",
          "Paste the snippet into the HTML field.",
          "Set the trigger to “All Pages”.",
          "Submit and publish the container.",
        ],
      },
    ],
  },

  overview: {
    title: "Overview",
    welcome: "Welcome to Widerrufsbutton DACH.",
    yourOrg: "Your organization",
    stats: {
      total: "Total withdrawals",
      last30: "Last 30 days",
      pending: "TSA pending",
    },
    noOrg: {
      title: "No organization yet",
      text: "Set up your master data first to configure the widget and log withdrawals in a legally compliant way.",
      cta: "Go to Settings",
    },
    avv: {
      title: "Data Processing Agreement (AVV)",
      acceptedAt: "Accepted on {date}",
      notAccepted: "Not yet accepted (Art. 28 GDPR).",
      acceptInSettings: "Accept it in Settings →",
    },
  },

  integrationCard: {
    title: "Integration",
    subscription: "Plan",
    gateNote:
      "The snippet appears as soon as an active subscription is in place (subscription_status = 'active').",
    subscribe: "Subscribe — €9/month",
  },

  logs: {
    title: "Withdrawal Log",
    subtitle: "Tamper-evident record of every incoming withdrawal.",
    entries: "{count} entries",
    pageOf: "Page {page}/{total}",
    empty: {
      title: "No withdrawals yet",
      text: "As soon as a withdrawal arrives via the widget, it appears here with cryptographic proof.",
    },
    th: {
      date: "Date",
      order: "Order ID",
      email: "E-mail",
      proof: "Proof (SHA-256)",
      tsa: "TSA",
    },
    anonymized: "— (anonymized)",
    status: {
      pending: "pending",
      anchored: "anchored",
    },
    back: "← Back",
    next: "Next →",
    zip: "ZIP",
  },

  settings: {
    title: "Settings",
    subtitle: "Manage master data, data processing and your subscription.",
    masterData: {
      title: "Master data",
      name: "Shop / company name",
      domains: "Allowed domains (CORS whitelist, comma-separated)",
      domainsPlaceholder: "shop.de, www.shop.de",
      impressum: "Imprint (appears in the receipt footer) *",
      save: "Save",
      create: "Create organization",
    },
    avv: {
      title: "Data Processing Agreement (AVV)",
      acceptedAt: "Accepted on {date}",
      consent:
        "I accept the data processing agreement (Art. 28 GDPR). The time and an anonymized IP are stored for audit purposes.",
      accept: "Accept AVV",
      needOrg: "Please create the organization first.",
    },
    subscription: {
      title: "Subscription",
      status: "Status:",
      subscribe: "Subscribe — €9/month",
      snippetHint: "You can find the integration snippet under “Overview”.",
    },
    saved: "Saved.",
    error: "Error: ",
    unknown: "unknown",
    avvAcceptedAt: "AVV accepted on ",
  },

  contact: {
    email: "vladresh09@gmail.com",
  },

  legal: {
    backHome: "← Back to home",
    contactCta: "Questions or suggestions?",
    contactEmailLabel: "Write to us:",
    impressum: {
      title: "Imprint",
      sections: [
        {
          heading: "Information pursuant to § 5 DDG",
          body: "Vladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nCyprus\n\nRepresented by: Vladislav Reshetnikov",
        },
        {
          heading: "Contact",
          body: "Email: {email}\n\nWritten enquiries are usually answered within a few business days.",
        },
        {
          heading: "Responsible for content pursuant to § 18 (2) MStV",
          body: "Vladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nCyprus",
        },
        {
          heading: "Consumer dispute resolution",
          body: "We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board (Verbraucherschlichtungsstelle, § 36 VSBG).\n\nNote: the European Commission's online dispute resolution (ODR) platform was discontinued in 2025, so no link to it is provided. You can reach us directly at the email address above.",
        },
        {
          heading: "Liability for content",
          body: "As a service provider we are responsible for our own content on these pages in accordance with general law (§ 7 (1) DDG). Pursuant to §§ 8 to 10 DDG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected.",
        },
        {
          heading: "Liability for links",
          body: "Our offer contains links to external websites of third parties over whose content we have no influence. The respective provider or operator is always responsible for the content of the linked pages. Should we become aware of any legal infringements, we will remove such links immediately.",
        },
        {
          heading: "Copyright",
          body: "The content and works created by us on these pages are subject to copyright. Contributions by third parties are marked as such. Reproduction, processing, distribution or any kind of use beyond the limits of copyright require our written consent.",
        },
      ],
    },
    datenschutz: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. Controller and roles",
          body: "Controller within the meaning of Art. 4 (7) GDPR for this website, the dashboard and billing is:\nVladislav Reshetnikov\nc/o Julia Andreyeva, Americanas 4, flat 404\n4048 Limassol\nCyprus\nEmail: {email}\n\nImportant distinction: for the withdrawal data of your end customers, you — the shop operator — are the controller, and we act solely as your processor (Auftragsverarbeiter) under a data processing agreement (AVV, Art. 28 GDPR). For your own account and billing data, we are the controller.",
        },
        {
          heading: "2. What this policy covers",
          body: "We process personal data only to the extent necessary to provide a functional website and our service, and always in accordance with the GDPR. This policy explains what we process when you visit the site, run the dashboard or subscribe — and how we handle the withdrawal data your customers submit through the widget.",
        },
        {
          heading: "3. Legal bases (Art. 6 GDPR)",
          body: "We rely on the following legal bases:\n• Performance of a contract / pre-contractual steps — Art. 6 (1)(b): operating your account and the service.\n• Legitimate interests — Art. 6 (1)(f): secure operation, hosting, abuse prevention and error monitoring.\n• Legal obligation — Art. 6 (1)(c): statutory retention duties (e.g. tax).\n• Consent — Art. 6 (1)(a): only where we explicitly ask for it (you can withdraw it at any time).",
        },
        {
          heading: "4. Hosting and server log files",
          body: "The website and the service API are hosted on Vercel, with the application running in the EU region fra1 (Frankfurt). With every request the infrastructure processes server log data such as IP address, date and time, the requested resource and the user agent, for the purpose of secure and stable operation (Art. 6 (1)(f) GDPR).",
        },
        {
          heading: "5. Account and login (dashboard)",
          body: "To use the dashboard you log in with your email address via a one-time code / magic link (passwordless). Authentication is handled by Supabase. We process your email address and authentication metadata to operate your account (Art. 6 (1)(b) GDPR).",
        },
        {
          heading: "6. Withdrawal widget data (processing on behalf of the shop)",
          body: "When an end customer submits a withdrawal through the widget, we process their name, email address and order number in order to create the legally required confirmation (§ 356a BGB) on a durable medium (§ 126b BGB). Name and email are encrypted at rest with AES-256-GCM; only the order number is stored in plain text. The visitor's IP address is used transiently for rate limiting and is not stored in identifiable form; where an IP is recorded for audit purposes it is anonymised first. We process this data exclusively as your processor under the AVV, which you can review and accept in the dashboard.",
        },
        {
          heading: "7. Email delivery (durable medium)",
          body: "Confirmation emails are sent via Resend as a durable medium pursuant to § 126b BGB. The recipient's email address and the message content are processed solely to deliver the confirmation; EU sending is enforced in the provider configuration.",
        },
        {
          heading: "8. Payment processing (LemonSqueezy as Merchant of Record)",
          body: "Payments are handled by LemonSqueezy, which acts as the Merchant of Record. This means LemonSqueezy is the seller of record: it collects the payment, issues the invoice and handles VAT/taxes on its own responsibility. At checkout we pass only an internal organisation identifier (org_id). In return we receive the subscription status, the plan, the billing email address and a customer/subscription id — just enough to activate or deactivate your widget. We never receive or store full card data. The payment and billing data you enter is processed by LemonSqueezy under its own privacy policy: https://www.lemonsqueezy.com/privacy. Legal basis: Art. 6 (1)(b) GDPR.",
        },
        {
          heading: "9. Processors and subprocessors",
          body: "We use the following service providers. We conclude a data processing agreement (AVV/DPA) with each of them; where a provider may process data outside the EU/EEA, transfers are safeguarded by the EU standard contractual clauses (SCC).\n\n• Vercel — hosting & delivery of the app/API (execution region fra1, Frankfurt, EU; company based in the USA) → DPA + SCC.\n• Supabase — database & authentication, including encrypted PII and account data (EU region; company based in the USA) → DPA + SCC.\n• Resend — transactional email delivery (EU sending configured; provider based in the USA) → DPA + SCC.\n• Upstash — rate limiting (Redis); IP processed transiently and not stored (EU region) → DPA, SCC if applicable.\n• Sentry — error and performance monitoring (USA) → DPA + SCC.\n• LemonSqueezy — payment processing / Merchant of Record (USA); own controller for payment data → see section 8, SCC for any transfer.\n• DigiCert (Time-Stamping Authority, RFC 3161) — qualified timestamp of the daily Merkle root only; no personal data is transmitted, only a cryptographic hash (USA).",
        },
        {
          heading: "10. Cookies and local storage",
          body: "We do not use advertising or tracking cookies and we do not profile you. We only use:\n• a language cookie (\"lang\", valid ~1 year) that remembers your DE/EN choice, mirrored in your browser's localStorage;\n• essential authentication cookies set by Supabase when you log in to the dashboard, including a temporary PKCE login cookie.\nThese are technically necessary or based on the contract (Art. 6 (1)(f) and (b) GDPR), so no consent banner is required for them.",
        },
        {
          heading: "11. Retention and deletion",
          body: "Account and billing data are kept for the duration of the subscription and for as long as statutory retention periods require (e.g. tax law). Withdrawal records are anonymised automatically after the configured retention period (180 days by default); the cryptographic hash is retained so the proof remains verifiable without any personal data.",
        },
        {
          heading: "12. Your rights",
          body: "You have the right to access, rectification, erasure, restriction of processing, data portability and to object, as well as the right to withdraw any consent with effect for the future. You also have the right to lodge a complaint with a supervisory authority. To exercise your rights, contact: {email}.\n\nFor end-customer withdrawal data, please address the shop where you placed your order — that shop is the controller, and we will support it as its processor.",
        },
        {
          heading: "13. Data security",
          body: "All connections are encrypted via TLS. Personal data in the withdrawal log is additionally encrypted at the field level with AES-256-GCM, data is hosted in the EU, and access is restricted to what is technically necessary.",
        },
        {
          heading: "14. Contact for data protection",
          body: "For any questions about data protection or to exercise your rights, contact us at: {email}.",
        },
      ],
    },
  },
};

export type Dict = typeof en;
