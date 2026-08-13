import { Suspense } from 'react';
import styles from './player-list.module.scss';
import AudioPlayer from '../player/player.component';
import Button from '../button/button.component';
import { transformCollectionToMonth } from '@/utils/utils';
import data from '@/data/data.json';

const getAudioData = (currentMonth) => {
  const formattedMonth = transformCollectionToMonth[currentMonth];
  const { audioData } = data?.fourteen?.monthsData[formattedMonth];
  return audioData;
};

const PlayerList = ({ month }: { month: string }) => {
  const audioData = getAudioData(month);

  return (
    <div className={styles.playerWrapper}>
      {audioData.map((audio) => (
        <article key={audio.audioFile} className={styles.playerArticle}>
          {/*
            Which episode is open comes from the `Ep` query param, which these
            statically prerendered pages can only read in the browser. That
            forces this subtree to be client-rendered, so the fallback is what
            lands in the HTML — and the collapsed button is exactly the state
            every episode starts in. Prerendering it puts the full episode list
            in the static HTML instead of a spinner, and the browser swaps in
            the player for whichever episode is selected.
          */}
          <Suspense
            fallback={
              <Button
                audioTitle={audio.audioTitle}
                episodeNumber={audio.episodeNumber}
              />
            }
          >
            <AudioPlayer
              audioFile={audio.audioFile}
              audioTitle={audio.audioTitle}
              episodeNumber={audio.episodeNumber}
            />
          </Suspense>
        </article>
      ))}
    </div>
  );
};

export default PlayerList;
