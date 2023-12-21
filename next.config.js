const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    serverActions: true,
  },
  swcMinify: true, // SWC 기반 최소화 활성화
};

module.exports = nextConfig;
