import React from 'react';
import styles from './podcast-list.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function PodcastList() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.subheading}>Escúchalo Aquí, o En:</p>
      <ul className={styles.podcastList}>
        <li>
          <div>
            <Link href="https://podcasts.apple.com/us/podcast/tu-hora-divina/id1659299472">
              <Image
                src="/images/apple-podcast.svg"
                width="140"
                height="38"
                alt="Escúchalo en Apple Podcasts"
              />
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link href="https://open.spotify.com/show/68i6aFTTVXB9c1afxfsHcx?si=6378bb51ba5d4bf6">
              <Image
                src="/images/spotify-podcast.svg"
                width="140"
                height="38"
                alt="Escúchalo en Spotify"
              />
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link href="https://castbox.fm/channel/id5241199?country=mx">
              <Image
                src="/images/castbox-podcast.svg"
                width="140"
                height="38"
                alt="Escúchalo en Castbox"
              />
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
