console.log("PORT from .env:", process.env.PORT);


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    PORT: process.env.PORT || 6000,
  }
};

module.exports = nextConfig;
