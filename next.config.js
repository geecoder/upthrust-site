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
};
module.exports = nextConfig;
