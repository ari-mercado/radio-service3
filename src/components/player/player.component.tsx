'use client';
import { Suspense, lazy, useState } from 'react';
const AudioPlayer = lazy(() => import('react-h5-audio-player'));
import './player-overwrite.scss';
import styles from './player.module.scss';
import Button from '../button/button.component';
import { useSearchParams } from 'next/navigation';

const spinner = <span className={styles.buttonSpinner} />;

interface AudioPlayerProps {
  audioFile: string;
  audioTitle: string;
  episodeNumber: number;
}

// const getEpisodeNumber = (audioTitle: string): string => {
//   return audioTitle
//     .split('')
//     .filter((el) => Number(el) || el == '0')
//     .join('');
// };

const AudioPlayerC = ({
  audioFile,
  audioTitle,
  episodeNumber,
}: AudioPlayerProps) => {
  // const episodeNumber = getEpisodeNumber(audioTitle);
  const searchParams = useSearchParams();

  // The mp3 is streamed, so there is a gap between the click on play and the
  // first byte of sound. The player already counts itself as "playing" the
  // moment audio.play() is called, so it shows a pause icon while nothing is
  // audible yet. Track the buffering window and swap the icon for a spinner.
  const [isBuffering, setIsBuffering] = useState(false);
  const stopBuffering = () => setIsBuffering(false);

  if (episodeNumber.toString() !== searchParams.get('Ep')) {
    return <Button audioTitle={audioTitle} episodeNumber={episodeNumber} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.episodeTitle}>
        <strong>
          ({episodeNumber}) {audioTitle}
        </strong>
      </h2>
      <Suspense fallback={<div className={styles.spinner} />}>
        <AudioPlayer
          src={audioFile}
          className={styles.audioPlayer}
          onPlay={(e) => {
            // Anything below HAVE_FUTURE_DATA still has to download before it
            // makes a sound; above it, playback starts instantly and showing a
            // spinner would only flash.
            const audio = e.target as HTMLAudioElement;
            setIsBuffering(audio.readyState < audio.HAVE_FUTURE_DATA);
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={stopBuffering}
          onPause={stopBuffering}
          onEnded={stopBuffering}
          onAbort={stopBuffering}
          onError={stopBuffering}
          // Both slots need the spinner: the player considers itself playing
          // while it buffers, so it is the pause icon that is on screen then.
          // `undefined` falls through to the player's own default icon.
          customIcons={{
            play: isBuffering ? spinner : undefined,
            pause: isBuffering ? spinner : undefined,
          }}
        />
      </Suspense>
    </div>
  );
};

export default AudioPlayerC;
