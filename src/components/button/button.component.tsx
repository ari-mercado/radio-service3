import React from 'react';
import styles from './button.module.scss';
import { AiOutlineDoubleRight } from 'react-icons/ai';

interface ButtonProps {
  handleSetActive: (player: string) => any;
  audioTitle: string;
}

const Button = ({ handleSetActive, audioTitle }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => handleSetActive(audioTitle)}
    >
      <span className={styles.buttonText}>{audioTitle}</span>
      <AiOutlineDoubleRight className={styles.icon} />
    </button>
  );
};

export default Button;
