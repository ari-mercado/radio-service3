import { AudioData } from '@/types/types';
import { SeasonConfig, spacedRange } from '@/config/seasons';
import {
  PODCAST_PROFILES,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
} from '@/config/site';

const PODCAST_ID = `${SITE_URL}#podcast`;

/**
 * `00:54:03` -> `PT54M3S`, which is the ISO 8601 duration schema.org wants.
 * Returns undefined for anything that is not HH:MM:SS so a malformed value is
 * left out of the markup rather than emitted as garbage.
 */
export const durationToIso8601 = (duration?: string): string | undefined => {
  const match = duration?.match(/^(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return undefined;

  const [hours, minutes, seconds] = match.slice(1).map(Number);
  const parts = [
    hours ? `${hours}H` : '',
    minutes ? `${minutes}M` : '',
    // Keep seconds even at 0 so the value is never a bare "PT".
    seconds || (!hours && !minutes) ? `${seconds}S` : '',
  ];

  return `PT${parts.join('')}`;
};

/**
 * The page one group of episodes lives on. This is the canonical URL: it is the
 * address that is statically generated, and the only one without a query string.
 */
export const groupUrl = (season: SeasonConfig, range: string) =>
  `${SITE_URL}${season.basePath}/${range}`;

/** An episode's own address — the group page plus its `Ep` param, no new route. */
export const episodeUrl = (
  season: SeasonConfig,
  range: string,
  episodeNumber: number,
) => `${groupUrl(season, range)}?Ep=${episodeNumber}`;

const seasonId = (season: SeasonConfig) =>
  `${SITE_URL}#temporada-${season.number}`;

const podcastSeries = {
  '@type': 'PodcastSeries',
  '@id': PODCAST_ID,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: SITE_LANGUAGE,
  sameAs: PODCAST_PROFILES,
};

const podcastSeason = (season: SeasonConfig) => ({
  '@type': 'PodcastSeason',
  '@id': seasonId(season),
  name: season.label,
  seasonNumber: season.number,
  url: `${SITE_URL}${season.basePath}`,
  inLanguage: SITE_LANGUAGE,
  partOfSeries: { '@id': PODCAST_ID },
});

const podcastEpisode = (
  season: SeasonConfig,
  range: string,
  episode: AudioData,
) => {
  const url = episodeUrl(season, range, episode.episodeNumber);
  const duration = durationToIso8601(episode.duration);

  return {
    '@type': 'PodcastEpisode',
    '@id': url,
    url,
    name: episode.audioTitle,
    // Global across the catalog, 1-74 — not restarted per season.
    episodeNumber: episode.episodeNumber,
    description: episode.description,
    datePublished: episode.date,
    inLanguage: SITE_LANGUAGE,
    partOfSeries: { '@id': PODCAST_ID },
    partOfSeason: { '@id': seasonId(season) },
    // Spread so an episode missing either one omits the key instead of
    // publishing `undefined`.
    ...(duration ? { duration } : {}),
    ...(episode.spotifyUrl ? { sameAs: episode.spotifyUrl } : {}),
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: episode.audioFile,
      encodingFormat: 'audio/mpeg',
      ...(duration ? { duration } : {}),
    },
  };
};

/**
 * JSON-LD for one group page: the series and the season it belongs to, the
 * episodes it lists, and an ItemList tying them to this page in display order.
 */
export const groupStructuredData = (
  season: SeasonConfig,
  range: string,
  episodes: AudioData[],
) => {
  const episodeNodes = episodes.map((episode) =>
    podcastEpisode(season, range, episode),
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      podcastSeries,
      podcastSeason(season),
      ...episodeNodes,
      {
        '@type': 'ItemList',
        '@id': `${groupUrl(season, range)}#lista`,
        name: `${season.label}: episodios ${spacedRange(range)}`,
        numberOfItems: episodeNodes.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: episodeNodes.map((node, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: node.url,
          item: { '@id': node['@id'] },
        })),
      },
    ],
  };
};

/** `<` is escaped so the payload can never close the surrounding script tag. */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
