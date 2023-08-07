'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from './player.component';
import styles from './player-list.module.scss';
import { AudioData } from '../../types/types';
import { transformCollectionToMonth } from '@/utils/utils';

const PlayerList = () => {
  const [isActive, setIsActive] = useState('');
  const [audioData, setAudioData] = useState<AudioData[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchAudio = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_FOURTEEN_DATA_URL);
      const data = await res.json();
      const currentMonth = params.months as string;
      const formattedMonth = transformCollectionToMonth[currentMonth];
      const { audioData } = data?.fourteen?.monthsData[formattedMonth];
      setAudioData(audioData);
    };

    fetchAudio();
  }, [params.months]);

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
