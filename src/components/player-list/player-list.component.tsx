import styles from './player-list.module.scss';
import AudioPlayer from '../player/player-dynamic.component';
import { transformCollectionToMonth } from '@/utils/utils';

const getAudioData = async (currentMonth) => {
  const res = await fetch(process.env.FOURTEEN_DATA_URL, {
    cache: 'force-cache',
  });
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
            episodeNumber={audio.episodeNumber}
          />
        </article>
      ))}
    </div>
  );
};

export default PlayerList;
