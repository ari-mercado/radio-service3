'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './nav.module.scss';

const useIsDesktop = (): boolean => {
  const [isDesktop, setDesktop] = useState<boolean>(true);

  const updateMedia = useCallback(() => {
    setDesktop(window.innerWidth > 845);
  }, [setDesktop]);

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    updateMedia();
    return () => window.removeEventListener('resize', updateMedia);
  });

  return isDesktop;
};

const NavBar = ({ handleYear }: { handleYear: (year: string) => unknown }) => {
  const [active, setActive] = useState<string>('fourteen');
  const isDesktop = useIsDesktop();

  return (
    <nav className={styles.mainMenu}>
      <ul>
        <li
          onClick={() => {
            handleYear('fourteen');
            setActive('fourteen');
          }}
          className={`
            ${active === 'fourteen' ? styles.activeItem : ''}
          `}
        >
          {isDesktop ? <a>Temporada 1</a> : <a>Temp 1</a>}
        </li>

        <li
          onClick={() => {
            handleYear('fifteen');
            setActive('fifteen');
          }}
          className={`
            ${active === 'fifteen' ? styles.activeItem : ''}
          `}
        >
          {isDesktop ? (
            <a>
              Temporada 2{' '}
              <span className={styles.pronto}> (llegará pronto)</span>
            </a>
          ) : (
            <a>
              Temp 2<span className={styles.pronto}> (llegará pronto)</span>
            </a>
          )}
        </li>

        {/* <li
					onClick={() => {
						handleYear('sixteen');
						setActive('sixteen');
					}}
					className={`
            ${active === 'sixteen' ? styles.activeItem : ''}
          `}
				>
					{isDesktop ? (
						<a>Temporada 3</a>
					) : (
						<a>Temp 3</a>
					)}
				</li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
