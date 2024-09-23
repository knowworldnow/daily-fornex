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
      // Rewrite URLs with trailing slash to the actual pages
      {
        source: '/:slug/',
        destination: '/post/:slug',
      },
      // Keep the original rewrite for compatibility
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
        source: '/:slug((?!.*/$).*)',
        has: [
          {
            type: 'header',
            key: 'x-matched-path',
            value: '/:slug',
          },
        ],
        destination: '/:slug/',
        permanent: true,
      },
    ];
  },
};

module.exports = withFaust(nextConfig);
