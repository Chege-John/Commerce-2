/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "people.pic1.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app-uploads-cdn.fera.ai",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: process.env.NODE_ENV === "production" ? "export" : undefined,
};

export default nextConfig;
