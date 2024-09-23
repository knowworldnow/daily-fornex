const { withFaust } = require('@faustwp/core');
const { createSecureHeaders } = require('next-secure-headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['forestgreen-pig-914075.hostingersite.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'", 'https:'],
              styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
              scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https:'],
              imgSrc: ["'self'", 'data:', 'https:'],
              connectSrc: ["'self'", 'https:'],
              frameSrc: [process.env.NEXT_PUBLIC_WORDPRESS_URL, 'https:'],
              fontSrc: ["'self'", 'https:'],
            },
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
        }),
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/post/:slug',
      },
    ];
  },
  async redirects() {
    return [
      // Redirect posts without trailing slash to posts with trailing slash
      {
        source: '/post/:slug((?!.*/$).*)',
        destination: '/post/:slug/',
        permanent: true,
      },
      // Redirect pages without trailing slash to pages with trailing slash
      {
        source: '/page/:slug((?!.*/$).*)',
        destination: '/page/:slug/',
        permanent: true,
      },
    ];
  },
};

module.exports = withFaust(nextConfig);
