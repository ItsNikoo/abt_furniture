// next-sitemap.config.js

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://example.ru',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/admin/*', '/api/*', '/admin'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/'],
            },
        ],
    },
    transform: async (config, path) => {
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }
        if (path.startsWith('/catalog/')) {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }
        return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        };
    },
};