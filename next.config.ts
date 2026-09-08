/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // 👈 Allows Next.js to optimize images from local backend (localhost:8000)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-production-3c6bc.up.railway.app',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://web-production-3c6bc.up.railway.app http://localhost:8000;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;