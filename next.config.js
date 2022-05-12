/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URI: "https://api.opensea.io/api/v1"
  },
 
}

module.exports = nextConfig
