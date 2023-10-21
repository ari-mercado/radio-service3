'use client';

import React from 'react';
import styles from './button.module.scss';
import { AiOutlineCaretDown } from 'react-icons/ai';

interface ButtonProps {
  handleSetActive: () => any;
  audioTitle: string;
  episodeNumber: number;
}

const Button = ({
  handleSetActive,
  audioTitle,
  episodeNumber,
}: ButtonProps) => {
  return (
    <div
      className={styles.button}
      onClick={() => handleSetActive()}
      role="button"
    >
      <h2 className={styles.buttonText}>
        ({episodeNumber}) {audioTitle}
      </h2>
      <AiOutlineCaretDown className={styles.icon} />
    </div>
  );
};

export default Button;
