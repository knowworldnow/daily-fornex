/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://dailyfornex.com';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,  // Generates robots.txt alongside sitemap
  exclude: ['/wordpress-sitemap.xml'],  // Excludes specific paths
  sitemapSize: 7000,  // Adjust sitemap size if needed for larger sites
  transform: async (config, path) => {
    // Exclude old WordPress-style URLs or any custom logic
    if (path.match(/\/\d{4}\/\d{2}\/\d{2}\/.*/gim)) {
      return null;
    }

    return {
      loc: path,  // The page URL
      changefreq: path === '/' ? 'daily' : 'weekly',  // Set change frequency
      priority: path === '/' ? 1 : 0.7,  // Priority for homepage and other pages
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined  // Auto-update last modified date
    };
  },
  additionalPaths: async (config) => {
    // Add any additional paths you want included in the sitemap
    return [];
  },
};
