/** @type {import('next-sitemap').IConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_URL;

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/wordpress-sitemap.xml'], // Exclude specific paths from the sitemap
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }, // Allow all paths by default
      { userAgent: '*', disallow: '/category/' }, // Disallow indexing of categories
      { userAgent: '*', disallow: '/tag/' }, // Disallow indexing of tags
    ],
    additionalSitemaps: [
      `${SITE_URL}/wordpress-sitemap.xml`, // WordPress sitemap
    ],
  },
  transform: (config, path) => {
    if (path.match(/\/\d{4}\/\d{2}\/\d{2}\/.*/gim)) {
      return null; // Exclude date-based paths from the sitemap
    }

    return {
      loc: path.endsWith('/') ? path : `${path}/`, // Ensure trailing slash
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
