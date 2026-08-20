/**
 * The twelve labels every season is grouped under. For Temporada 1 they line up
 * with the real 2014 air dates; for Temporada 2 they are grouping labels only —
 * that season's recordings are scattered across 2015 and 2016 and their dates
 * play no part in where an episode appears or what its URL is.
 */
export const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

export type MonthName = (typeof MONTHS)[number];

export interface SeasonConfig {
  /** Season as the website presents it. Not Spotify's — there all 74 are one season. */
  number: number;
  /** Key into data.json. */
  dataKey: 'fourteen' | 'seasonTwo';
  /** Route prefix, and the first half of every canonical URL for the season. */
  basePath: string;
  label: string;
  /** Swapped in for `label` on narrow screens, by a media query in the nav stylesheet. */
  shortLabel: string;
  /**
   * Month label -> the episode-range slug that addresses it, e.g. `41-43`.
   * These strings are the public URLs, so they are written out rather than
   * derived: changing the data must never silently move a page.
   */
  monthRanges: Record<MonthName, string>;
}

export const SEASONS: SeasonConfig[] = [
  {
    number: 1,
    dataKey: 'fourteen',
    basePath: '/temporada-1',
    label: 'Temporada 1',
    shortLabel: 'Temp 1',
    monthRanges: {
      enero: '1-4',
      febrero: '5-8',
      marzo: '9-13',
      abril: '14-17',
      mayo: '18-21',
      junio: '22',
      julio: '23',
      agosto: '24-28',
      septiembre: '29-30',
      octubre: '31-34',
      noviembre: '35-39',
      diciembre: '40',
    },
  },
  {
    number: 2,
    dataKey: 'seasonTwo',
    basePath: '/temporada-2',
    label: 'Temporada 2',
    shortLabel: 'Temp 2',
    monthRanges: {
      enero: '41-43',
      febrero: '44-46',
      marzo: '47-49',
      abril: '50-52',
      mayo: '53-55',
      junio: '56-58',
      julio: '59-61',
      agosto: '62-64',
      septiembre: '65-67',
      octubre: '68-70',
      noviembre: '71-72',
      diciembre: '73-74',
    },
  },
];

export const getSeason = (seasonNumber: number): SeasonConfig => {
  const season = SEASONS.find((s) => s.number === seasonNumber);
  if (!season) throw new Error(`No season configured for ${seasonNumber}`);
  return season;
};

/**
 * Which season a pathname belongs to, or undefined off the season routes.
 * `startsWith` on the base path plus a boundary so `/temporada-1` can never
 * match a future `/temporada-10`.
 */
export const seasonForPath = (pathname: string): SeasonConfig | undefined =>
  SEASONS.find(
    (season) =>
      pathname === season.basePath ||
      pathname.startsWith(`${season.basePath}/`),
  );

/** `41-43` -> `enero`, scoped to one season. */
export const monthForRange = (
  season: SeasonConfig,
  range: string,
): MonthName | undefined =>
  MONTHS.find((month) => season.monthRanges[month] === range);

/** Every range slug in a season, in month order — the season's static params. */
export const rangesOf = (season: SeasonConfig): string[] =>
  MONTHS.map((month) => season.monthRanges[month]);

/** `1-4` -> `1 - 4`. A single-episode group like `22` is left alone. */
export const spacedRange = (range: string): string =>
  range.split('-').join(' - ');

/**
 * The episode a month or season link should open. Taken from the range slug,
 * which by construction starts with the group's first episode. Deriving it here
 * rather than from the catalog keeps this module free of `data.json`, so the
 * client-side nav does not drag all 74 episodes into the browser bundle.
 * `episodes-match-config` in the validation script checks the two agree.
 */
export const firstEpisodeOfRange = (range: string): number =>
  Number(range.split('-')[0]);
