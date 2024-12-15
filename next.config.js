// next.config.js
const dotenv = require('dotenv');
dotenv.config();


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT || 6000,
  }
};

module.exports = nextConfig;
