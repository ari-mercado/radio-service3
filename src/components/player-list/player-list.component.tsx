'use client';

import React from 'react';
import AudioPlayer from './player.component';
import styles from './player-list.module.scss';
import { AudioData } from '../../types/types';

interface PlayerListProps {
  audioData: AudioData[];
}

const PlayerList = ({ audioData }: PlayerListProps) => {
  const firstPlayer = audioData && audioData[0]?.audioTitle;
  const [isActive, setIsActive] = React.useState(firstPlayer || '');

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
