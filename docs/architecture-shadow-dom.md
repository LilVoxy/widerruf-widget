# Phase 2 — Shadow DOM isolation architecture

> **Zero Trust Environment.** The widget assumes the host page is maximally
> hostile: conflicting library versions, overridden globals, and aggressive CSS
> resets. Encapsulation via Shadow DOM is **not a recommendation — it is a hard
> system requirement.**

## Isolation strategy

```
host page (any CMS / framework)
└── <script src=".../widget.min.js" data-api-key="..." defer>
      └── creates  <widerruf-button>  (custom element, appended to <body>)
            └── this.attachShadow({ mode: 'closed' })   ← closed root
                  ├── <style> … all CSS inlined here … </style>
                  ├── <button class="entry">Vertrag widerrufen</button>   (position:fixed; z-index:999999)
                  └── <div class="modal" role="dialog" aria-modal="true"> … </div>
```

### Why `mode: 'closed'`

- `element.shadowRoot` returns `null` from the host page → host scripts cannot
  reach into the widget DOM and cannot accidentally (or maliciously) mutate it.
- The internal root reference is kept in a closure variable only.

### CSS containment (both directions)

1. **Host → widget:** A Shadow DOM creates a style scope. Host selectors do not
   match nodes inside the shadow tree, so a global `* { all: unset }` reset on
   the host cannot make the withdrawal button unreadable (which would itself be a
   § 356a violation). We additionally set `all: initial` on the host element and
   declare every property explicitly inside the shadow `<style>`.
2. **Widget → host:** All rules live inside the shadow `<style>`; nothing leaks
   to the document. No global classes, no external stylesheet (forbidden by spec).
   We also set `contain: layout style;` on the root container.

### Z-index / positioning

The floating entry button uses `position: fixed; inset: auto 20px 20px auto;
z-index: 999999;` so it stays visible above sticky headers, cookie banners, etc.

### Core Web Vitals safety

- Loaded with `defer` → never blocks HTML parsing or first paint.
- The custom element is appended **after** `DOMContentLoaded`; the heavy modal
  markup is only built on first open (lazy) → no layout shift (CLS ≈ 0) and no
  impact on LCP of host content.
- No web fonts, no external requests at load time (only on submit).
- Bundle ≈ 2.8 KB over the wire (gzip; ~6.5 KB raw) → negligible main-thread
  cost (good FID/INP). The size gate enforces the transferred (gzip) budget,
  which is what the browser downloads from the CDN.

### Accessibility (WCAG 2.2 AA / BFSG 2025)

- Full keyboard operability: the entry button is a native `<button>`; the modal
  traps focus, supports `Esc` to close, and restores focus to the trigger.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`
  wire the title/inputs to assistive tech.
- Every input has a programmatic `<label>`; errors use `aria-invalid` +
  `aria-describedby`. Contrast ratios meet AA (≥ 4.5:1).

### Browser support

Custom Elements v1 + Shadow DOM v1 are supported in the last two major versions
of Chrome, Edge, Firefox and Safari (the required matrix). No polyfills shipped
(they would blow the 3–5 KB budget); shops needing legacy support are documented
in onboarding.

---

**Result of Phase 2:** ready-to-run SQL migrations with RLS
(`supabase/migrations/*.sql`), the OpenAPI 3.1 spec (`docs/openapi.yaml`), and
this Shadow DOM isolation protocol.
