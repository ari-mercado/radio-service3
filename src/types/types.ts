export type AudioData = {
  episodeNumber: number;
  audioTitle: string;
  // ISO date, YYYY-MM-DD.
  date: string;
  description: string;
  audioFile: string;
  slug: string;
  // Both are present for every episode of Temporada 1, but stay optional so an
  // episode can be added before its Spotify page or its runtime is known.
  // `duration` is HH:MM:SS.
  duration?: string;
  spotifyUrl?: string;
};

export interface Month {
  monthTitle: string;
  audioData: AudioData[];
}

export interface Year {
  yearTitle: string;
  year: string;
  allMonths: string[];
  monthsData: Record<string, Month>;
}
