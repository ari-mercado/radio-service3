'use client';

import React from 'react';
import styles from './button.module.scss';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  audioTitle: string;
  episodeNumber: number;
}

// Owns the navigation itself so it can be rendered without a player around it,
// which is what lets the episode list prerender into the static HTML.
const Button = ({ audioTitle, episodeNumber }: ButtonProps) => {
  const router = useRouter();

  // Picking an episode only swaps the `Ep` query param; the month page is
  // already on screen, so leave the scroll position alone.
  const handleSetActive = () => {
    router.push(`?Ep=${episodeNumber}`, { scroll: false });
  };

  return (
    <div className={styles.button} onClick={handleSetActive} role="button">
      <h2 className={styles.buttonText}>
        {episodeNumber}: {audioTitle}
      </h2>
      <AiOutlineCaretDown className={styles.icon} />
    </div>
  );
};

export default Button;
