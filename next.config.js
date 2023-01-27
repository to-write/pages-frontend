/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
}

module.exports = nextConfig
