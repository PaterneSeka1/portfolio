// next.config.js
const storageUrl = process.env.STORAGE_API_URL ? new URL(process.env.STORAGE_API_URL) : null;

/** Old URLs (before the v2 restructuring) kept alive with permanent redirects. */
const legacyRedirects = [
  { source: "/projets/rhvedem", destination: "/work/rh-vedem" },
  { source: "/projets/plateforme-ticketing", destination: "/work/ticketing" },
  { source: "/projets/intranet-entreprise", destination: "/work/intranet" },
  { source: "/projets/:slug", destination: "/work/:slug" },
  { source: "/projets", destination: "/work" },
  { source: "/expertises", destination: "/expertise" },
  { source: "/parcours", destination: "/about#experience" },
  { source: "/mentions-legales", destination: "/legal" },
  { source: "/confidentialite", destination: "/privacy" },
].map((redirect) => ({ ...redirect, permanent: true }));

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: storageUrl
      ? [
          {
            protocol: storageUrl.protocol.replace(":", ""),
            hostname: storageUrl.hostname,
            port: storageUrl.port || "",
            pathname: "/uploads/**",
          },
        ]
      : [],
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
