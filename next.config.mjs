/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.drupal.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
