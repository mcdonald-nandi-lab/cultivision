/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mcdonald-nandi-lab.github.io/cultivision",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './out',
  generateIndexSitemap: false,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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