import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Твои настройки
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/**',
      },
    ],
  },
  // ИСПРАВЛЕНО: Лимит для Server Actions (10 MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',  
    },
  },
}

export default nextConfig
