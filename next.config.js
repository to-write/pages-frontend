/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `http://219.248.110.167:30800/:path*`,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
