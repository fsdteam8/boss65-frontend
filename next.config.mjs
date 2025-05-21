/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.drupal.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
