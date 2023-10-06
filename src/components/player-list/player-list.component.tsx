import dynamic from 'next/dynamic';
import styles from './player-list.module.scss';
const AudioPlayer = dynamic(() => import('../player/player.component'), {
  // disable server prerendering to prevent hydration errors
  ssr: false,
});
import { transformCollectionToMonth } from '@/utils/utils';

const getAudioData = async (currentMonth) => {
  const res = await fetch(process.env.FOURTEEN_DATA_URL);
  const data = await res.json();
  const formattedMonth = transformCollectionToMonth[currentMonth];
  const { audioData } = data?.fourteen?.monthsData[formattedMonth];
  return audioData;
};

const PlayerList = async ({ month }: { month: string }) => {
  const audioData = await getAudioData(month);

  return (
    <div className={styles.playerWrapper}>
      {audioData.map((audio) => (
        <article key={audio.audioFile} className={styles.playerArticle}>
          {/* <h2 className={styles.audioTitle}>{audio.audioTitle}</h2> */}
          <AudioPlayer
            audioFile={audio.audioFile}
            audioTitle={audio.audioTitle}
          />
        </article>
      ))}
    </div>
  );
};

export default PlayerList;
