import { Metadata } from 'next';
import { AudioData } from '@/types/types';
import { SeasonConfig, spacedRange } from '@/config/seasons';
import { episodesOf } from '@/data/episodes';
import { groupUrl } from '@/utils/structured-data';
import { SITE_LOCALE, SITE_NAME, SITE_URL } from '@/config/site';

/** Roughly where search engines stop showing a description. */
const DESCRIPTION_LIMIT = 160;

/** Joins Spanish list items: `a`, `a y b`, `a, b y c`. */
const joinEs = (items: string[]): string =>
  items.length <= 1
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

/** Trims at a word boundary and adds an ellipsis, rather than cutting mid-word. */
const truncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit - 1);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[.,;:—]$/, '')}…`;
};

const episodeLabel = (episodes: AudioData[]) =>
  episodes.length === 1 ? 'Episodio' : 'Episodios';

/**
 * A description specific to this group — it names the episodes the page
 * actually lists. The general show description is deliberately not used here;
 * it belongs to the site as a whole.
 */
const groupDescription = (
  season: SeasonConfig,
  episodes: AudioData[],
): string => {
  const titles = joinEs(episodes.map((episode) => `«${episode.audioTitle}»`));
  const numbers = episodes.map((episode) => episode.episodeNumber);
  const span =
    numbers.length === 1
      ? `el episodio ${numbers[0]}`
      : `los episodios ${numbers[0]} al ${numbers[numbers.length - 1]}`;

  return truncate(
    `${season.label} de ${SITE_NAME}: ${span} con el pastor Ariel — ${titles}.`,
    DESCRIPTION_LIMIT,
  );
};

/** Title, description, canonical and Open Graph for one group page. */
export const seasonGroupMetadata = (
  season: SeasonConfig,
  range: string,
): Metadata => {
  const episodes = episodesOf(season, range);
  const url = groupUrl(season, range);
  const title = `${season.label} · ${episodeLabel(episodes)} ${spacedRange(range)}`;
  const description = groupDescription(season, episodes);

  return {
    title,
    description,
    alternates: {
      // The bare group URL, never the `?Ep=` variant: the query param only
      // chooses which player on this same page is open.
      canonical: url,
    },
    openGraph: {
      type: 'website',
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
};

export const seasonGroupUrls = (season: SeasonConfig, ranges: string[]) =>
  ranges.map((range) => `${SITE_URL}${season.basePath}/${range}`);
