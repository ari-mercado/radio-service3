import { AudioData } from '@/types/types';

export const SITE_URL = 'https://www.tuhoradivina.com';

const PODCAST_ID = `${SITE_URL}#podcast`;

// The three directories the header already links to. Listing them as `sameAs`
// is what tells a crawler that this site and those listings are one podcast.
const PODCAST_PROFILES = [
  'https://podcasts.apple.com/us/podcast/tu-hora-divina/id1659299472',
  'https://open.spotify.com/show/68i6aFTTVXB9c1afxfsHcx',
  'https://castbox.fm/channel/id5241199',
];

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

/** The episode's address is the month page plus its `Ep` param — no new route. */
export const episodeUrl = (month: string, episodeNumber: number) =>
  `${SITE_URL}/temporada-1/${month}?Ep=${episodeNumber}`;

const podcastSeries = {
  '@type': 'PodcastSeries',
  '@id': PODCAST_ID,
  name: 'Tu Hora Divina',
  description:
    'Escucha al pastor hablar sobre la vida, la biblia y Jesucristo.',
  url: SITE_URL,
  inLanguage: 'es',
  sameAs: PODCAST_PROFILES,
};

const podcastEpisode = (month: string, episode: AudioData) => {
  const url = episodeUrl(month, episode.episodeNumber);
  const duration = durationToIso8601(episode.duration);

  return {
    '@type': 'PodcastEpisode',
    '@id': url,
    url,
    name: episode.audioTitle,
    episodeNumber: episode.episodeNumber,
    description: episode.description,
    datePublished: episode.date,
    inLanguage: 'es',
    partOfSeries: { '@id': PODCAST_ID },
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

/** JSON-LD for one month page: the series, plus the episodes it lists. */
export const monthStructuredData = (month: string, episodes: AudioData[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    podcastSeries,
    ...episodes.map((episode) => podcastEpisode(month, episode)),
  ],
});

/** `<` is escaped so the payload can never close the surrounding script tag. */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
