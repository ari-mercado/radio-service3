export type AudioData = {
  episodeNumber: number;
  // The season the *website* files this episode under. Spotify publishes all 74
  // as one continuous season; this only drives which /temporada-N page it
  // appears on. `episodeNumber` stays global, 1-74, in both.
  season: number;
  audioTitle: string;
  // ISO date, YYYY-MM-DD. Archival: it is what the episode aired on, and for
  // Temporada 2 it has no bearing on the episode's group or URL.
  date: string;
  description: string;
  audioFile: string;
  slug: string;
  // Both are present for every episode of both seasons, but stay optional so an
  // episode can be added before its Spotify page or its runtime is known.
  // `duration` is HH:MM:SS.
  duration?: string;
  spotifyUrl?: string;
};

export interface Month {
  monthTitle: string;
  audioData: AudioData[];
}

export interface Season {
  seasonNumber: number;
  seasonTitle: string;
  allMonths: string[];
  monthsData: Record<string, Month>;
}
