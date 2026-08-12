import styles from './player-list.module.scss';
import AudioPlayer from '../player/player-dynamic.component';
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
