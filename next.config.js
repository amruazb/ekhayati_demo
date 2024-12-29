const withNextIntl = require('next-intl/plugin')();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ekhayati-dev.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
  // i18n: {
  //   locales: ['en', 'ar'],
  //   defaultLocale: 'en',
  // }
}

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
