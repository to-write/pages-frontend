/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://192.168.75.206:30800/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
