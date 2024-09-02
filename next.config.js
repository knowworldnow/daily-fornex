const { withFaust, getWpHostname } = require('@faustwp/core')
const { createSecureHeaders } = require('next-secure-headers')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
	trailingSlash: true, // Ensures all URLs have a trailing slash
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
				source: '/:path(.*[^/])', // Matches paths that do not end in a slash
				destination: '/:path*/',
				permanent: true, // Ensures a 301 redirect to URLs with trailing slash
			},
		]
	},
})
