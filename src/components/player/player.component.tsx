'use client';
import { Suspense, lazy } from 'react';
const AudioPlayer = lazy(() => import('react-h5-audio-player'));
import './player-overwrite.scss';
import styles from './player.module.scss';
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

const AudioPlayerC = ({ audioFile, audioTitle }: AudioPlayerProps) => {
  const router = useRouter();
  const episodeNumber = getEpisodeNumber(audioTitle);
  const searchParams = useSearchParams();

  const createQueryString = () => {
    const params = new URLSearchParams();
    params.set('Ep', episodeNumber);
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  if (episodeNumber !== searchParams.get('Ep')) {
    return (
      <Button audioTitle={audioTitle} handleSetActive={createQueryString} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.episodeTitle}>
        <strong>Ep. {episodeNumber}</strong>
      </h2>
      <Suspense fallback={<div className={styles.spinner} />}>
        <AudioPlayer src={audioFile} className={styles.audioPlayer} />
      </Suspense>
    </div>
  );
};

export default AudioPlayerC;
