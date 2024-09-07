const { withFaust, getWpHostname } = require('@faustwp/core');
const { createSecureHeaders } = require('next-secure-headers');

const imageRemotePatterns = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'http',
    hostname: getWpHostname(),
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: getWpHostname(),
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: '0.gravatar.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'secure.gravatar.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'images.pexels.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 || '1.gravatar.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 || '1.gravatar.com',
    port: '',
    pathname: '/**',
  },
];

module.exports = withFaust({
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: imageRemotePatterns,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders({
          xssProtection: '1; mode=block', // Enable XSS Protection
          frameGuard: {
            action: 'sameorigin', // Stronger than 'allow-from'
          },
          referrerPolicy: 'no-referrer-when-downgrade', // More secure referrer policy
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
              scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
              styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
              fontSrc: ["'self'", 'https:', 'data:'],
            },
          },
        }),
      },
    ];
  },
});
