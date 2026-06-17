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
};

export type Dict = typeof en;
