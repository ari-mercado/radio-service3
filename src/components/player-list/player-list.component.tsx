'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from './player.component';
import styles from './player-list.module.scss';
import { AudioData } from '../../types/types';

interface PlayerListProps {
  audioData?: AudioData[];
}

const PlayerList = () => {
  const [isActive, setIsActive] = React.useState('');
  const [audioData, setAudioData] = useState([]);
  const params = useParams();
  const currentMonth = params.months as string;

  useEffect(() => {
    const fetchAudio = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_FOURTEEN_DATA_URL);
      const data = await res.json();
      const { audioData } = data?.fourteen?.monthsData[currentMonth];
      // const audioDatas = data?.fourteen?.monthsData?.enero?.audioData;
      setAudioData(audioData);
    };

    fetchAudio();
  }, [currentMonth]);

  const handleSetActive = (activePlayer: string) => {
    setIsActive(activePlayer);
  };

  return (
    <div className={styles.playerWrapper}>
      {audioData.map((audio) => (
        <article key={audio.audioFile} className={styles.playerArticle}>
          {/* <h2 className={styles.audioTitle}>{audio.audioTitle}</h2> */}
          <AudioPlayer
            audioFile={audio.audioFile}
            isActive={isActive}
            handleSetActive={handleSetActive}
            audioTitle={audio.audioTitle}
          />
        </article>
      ))}
    </div>
  );
};

export default PlayerList;
