/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mcdonald-nandi-lab.github.io/cultivision",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  outDir: './out',
  trailingSlash: true,
  transform: async (config, path) => {
    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: 'monthly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
