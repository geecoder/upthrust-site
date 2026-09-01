/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/pathway-product-management', destination: '/pathways/product-management', permanent: true },
      { source: '/pathway-business-analysis', destination: '/pathways/business-analysis', permanent: true },
    ];
  },
  async headers() {
    // Baseline security headers. Deliberately no Content-Security-Policy here —
    // this site loads Mixpanel, Tally, dotlottie, and (soon) Paystack; a CSP
    // needs its own dedicated third-party-domain audit, not a guess bundled
    // into this change.
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
