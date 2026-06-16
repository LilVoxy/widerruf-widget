import { withSentryConfig } from "@sentry/nextjs";

/**
 * Security + CDN headers. The widget bundle (`/widget.min.js`) is served from a
 * CDN in production, but we also expose it from `public/` with aggressive cache
 * headers so the same artifact can be fronted by Cloudflare / CloudFront.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonicalize on www: the PKCE code-verifier cookie is written on the host
  // that requested the magic-link, so the apex and www host must not diverge or
  // the /auth/callback exchange fails. Force every apex hit onto www.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "widerruf-widget.de" }],
        destination: "https://www.widerruf-widget.de/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/widget.min.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          // Immutable build artifact — cache hard at the CDN edge.
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  // org/project are read from SENTRY_ORG / SENTRY_PROJECT env vars at build time.
  widenClientFileUpload: true,
  disableLogger: true,
  // Don't ship source maps to end users; upload then delete after the build.
  sourcemaps: { deleteSourcemapsAfterUpload: true },
});
