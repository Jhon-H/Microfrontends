import { Routes } from '@angular/router';

import { routes as appRoutes } from '../app/app.routes';
import { environments } from '../environments/environment.prod';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function generateSitemap(routes: Routes): Promise<void> {
  const staticUrls = getStaticUrls(routes);
  const sitemapIndex = generateSitemapIndex(staticUrls);
  const sitemapPath = join(__dirname, '..', 'src', 'sitemap-index.xml');

  writeFileSync(sitemapPath, sitemapIndex);
  console.log('Sitemap generated successfully!');
}

function getStaticUrls(routes: Routes): string[] {
  return routes
    .map((route) => {
      let path = route.path as string;

      if (path.includes('*')) return null;

      const colonIndex = path.indexOf(':');
      if (colonIndex !== -1) path = path.substring(0, colonIndex);

      if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

      return path ? `${environments.siteUrl}/${path}/sitemap.xml` : null;
    })
    .filter(Boolean) as string[];
}

function generateSitemapIndex(urls: string[]): string {
  const sitemapIndexContent = urls
    .map((url) => {
      `<sitemap>
        <loc>${url}</loc>
      <sitemap>`;
    })
    .join('');

  return `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndexContent}
    </sitemapindex>`;
}

generateSitemap(appRoutes).catch(console.error);
