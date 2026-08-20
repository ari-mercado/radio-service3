import data from '@/data/data.json';
import { AudioData, Season } from '@/types/types';
import { SeasonConfig, monthForRange } from '@/config/seasons';

// Server-only by convention: everything here reaches into the full catalog, so
// importing it from a Client Component would ship all 74 episodes to the
// browser. The pure route/label config lives in @/config/seasons instead.

const seasonData = (season: SeasonConfig) => data[season.dataKey] as Season;

/** The episodes in one group, in catalog order. Empty if the range is unknown. */
export const episodesOf = (
  season: SeasonConfig,
  range: string,
): AudioData[] => {
  const month = monthForRange(season, range);
  if (!month) return [];
  return seasonData(season).monthsData[month].audioData as AudioData[];
};
