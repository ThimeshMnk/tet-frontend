/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This allows Next.js to fetch images from your local Laravel server
    dangerouslyAllowLocalIP: true, 
    
    remotePatterns: [
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
};

export default nextConfig;