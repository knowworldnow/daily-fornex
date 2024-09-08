/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://dailyfornex.com',
  generateRobotsTxt: true,
  exclude: ['/wordpress-sitemap.xml'], // Exclude specific paths from the sitemap
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }, // Allow all paths by default
      { userAgent: '*', disallow: '/category/' }, // Disallow indexing of categories
      { userAgent: '*', disallow: '/tag/' }, // Disallow indexing of tags
    ],
    additionalSitemaps: [
      'https://dailyfornex.com/wordpress-sitemap.xml', // WordPress sitemap
    ],
  },
  transform: (config, path) => {
    if (path.match(/\/\d{4}\/\d{2}\/\d{2}\/.*/gim)) {
      return null; // Exclude date-based paths from the sitemap
    }

    return {
      loc: `https://dailyfornex.com${path}`, // Generate absolute URL
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
