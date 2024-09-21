/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_URL;

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false, // Set to false since you've already created robots.txt
  exclude: ['/wordpress-sitemap.xml'],
  transform: async (config, path) => {
    // Exclude old WordPress-style URLs
    if (path.match(/\/\d{4}\/\d{2}\/\d{2}\/.*/gim)) {
      return null;
    }
    
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1 : 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    // You can add dynamic paths here if needed
    return [];
  },
};