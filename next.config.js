const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  trailingSlash: false, // Disable global trailing slash enforcement
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [
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
        hostname: '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '2.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3.gravatar.com',
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
      // from env
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders({
          xssProtection: false,
          frameGuard: [
            'allow-from',
            { uri: process.env.NEXT_PUBLIC_WORDPRESS_URL },
          ],
        }),
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path((?!.*\\.).*)', // Match all paths except those containing a file extension
        has: [
          {
            type: 'host',
            value: 'www.dailyfornex.com',
          },
        ],
        destination: 'https://dailyfornex.com/:path*', // Redirect to non-www
        permanent: true,
      },
      {
        source: '/:path*',
        destination: '/:path*/', // Add trailing slash if not present
        has: [
          {
            type: 'host',
            value: '^dailyfornex.com$',
          },
          {
            type: 'query',
            key: 'ignoreSlash',
            value: 'true',
          },
        ],
        permanent: true,
      },
    ]
  },
})
