'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import styles from './player-list.module.scss';
import Button from '../button/button.component';

interface AudioPlayerProps {
  audioFile: string;
  isActive: string;
  handleSetActive: (player: string) => any;
  audioTitle: string;
}

const AudioPlayer = ({
  audioFile,
  audioTitle,
  isActive,
  handleSetActive,
}: AudioPlayerProps) => {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (isActive !== audioTitle) {
    return <Button audioTitle={audioTitle} handleSetActive={handleSetActive} />;
  }

  return (
    <div className={styles.playerWrapper}>
      {!loading ? (
        <ReactPlayer
          url={audioFile}
          className={styles.audioPlayer}
          controls
          height={120}
          width="100%"
        />
      ) : (
        <div className={styles.spinner} />
      )}
    </div>
  );
};

export default AudioPlayer;
