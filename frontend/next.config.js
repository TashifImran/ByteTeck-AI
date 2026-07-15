/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye line zaroori hai!
  images: {
    unoptimized: true, // Static export ke liye zaroori hai
  },
}

module.exports = nextConfig