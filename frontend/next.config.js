/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye line Netlify ke liye zaroori hai
  images: {
    unoptimized: true, // Static export mein images ke liye
  },
}

module.exports = nextConfig