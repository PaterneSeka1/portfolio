// next.config.js
const storageUrl = process.env.STORAGE_API_URL ? new URL(process.env.STORAGE_API_URL) : null;

const nextConfig = {
  reactStrictMode: true,
  images: {
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
};

module.exports = nextConfig;
