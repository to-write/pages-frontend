/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://220.127.44.94:30800/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
