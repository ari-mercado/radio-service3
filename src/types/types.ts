export type AudioData = {
  audioTitle: string;
  audioFile: string;
  isFromSoundCloud: boolean;
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
