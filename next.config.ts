/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ['nodemailer'],
  },
  images: {
    domains: ['images.clerk.dev', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.clerk.dev',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;