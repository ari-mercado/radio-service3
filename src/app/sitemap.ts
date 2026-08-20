import { MetadataRoute } from 'next';
import { SEASONS, rangesOf } from '@/config/seasons';
import { SITE_URL } from '@/config/site';

/**
 * Every statically generated page, for both seasons. Built from the same season
 * config that drives `generateStaticParams`, so a group can never be rendered
 * without being listed here.
 *
 * `?Ep=` URLs are deliberately absent: they select which player is open on a
 * page that is already listed, and each one declares that page as its canonical.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const groups = SEASONS.flatMap((season) =>
    rangesOf(season).map((range) => ({
      url: `${SITE_URL}${season.basePath}/${range}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...groups,
  ];
}
