'use client';

import React from 'react';
import styles from './button.module.scss';
import { FaAngleDown } from 'react-icons/fa6';

interface ButtonProps {
  handleSetActive: () => any;
  audioTitle: string;
}

const Button = ({ handleSetActive, audioTitle }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={() => handleSetActive()}>
      <span className={styles.buttonText}>{audioTitle}</span>
      <FaAngleDown className={styles.icon} />
    </button>
  );
};

export default Button;
