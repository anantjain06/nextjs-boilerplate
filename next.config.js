/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URI: "https://api.opensea.io/api/v1"
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
