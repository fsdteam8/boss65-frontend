/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.drupal.org','encrypted-tbn0.gstatic.com'],
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
