'use client';

import dynamic from 'next/dynamic';
import styles from './player-list.module.scss';
// import ReactPlayer from 'react-player/lazy';
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  loading: () => <div className={styles.spinner} />,
  ssr: false,
});
import Button from '../button/button.component';
import { useRouter, useSearchParams } from 'next/navigation';

interface AudioPlayerProps {
  audioFile: string;
  audioTitle: string;
}

const getEpisodeNumber = (audioTitle: string): string => {
  return audioTitle
    .split('')
    .filter((el) => Number(el) || el == '0')
    .join('');
};

const AudioPlayer = ({ audioFile, audioTitle }: AudioPlayerProps) => {
  const router = useRouter();
  const episodeNumber = getEpisodeNumber(audioTitle);
  const searchParams = useSearchParams();

  const createQueryString = () => {
    const params = new URLSearchParams();
    params.set('Ep', episodeNumber);
    router.push(`?${params.toString()}`);
  };

  if (episodeNumber !== searchParams.get('Ep')) {
    return (
      <Button audioTitle={audioTitle} handleSetActive={createQueryString} />
    );
  }

  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        url={audioFile}
        className={styles.audioPlayer}
        controls
        height={120}
        width="100%"
      />
    </div>
  );
};

export default AudioPlayer;
