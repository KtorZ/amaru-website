import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export async function GET(context) {
  const edrs = await getCollection('edrs');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: edrs.map((edr) => ({
      ...edr.data,
      link: `/edr/${edr.id}/`,
    })),
  });
}
