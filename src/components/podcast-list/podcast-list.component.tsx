import React from 'react';
import styles from './podcast-list.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function PodcastList() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.subheading}>Escúchalo Aquí, o En:</h2>
      <ul className={styles.podcastList}>
        <li>
          <div>
            <Link href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9kMjBjYzA5Yy9wb2RjYXN0L3Jzcw">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src="https://www.gstatic.com/podcasts_console/promote/Spanish_ES/ES_Google_Podcasts_Badge.svg"
                width="150"
                height="38"
                alt="Escúchalo en Google Podcasts"
              />
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link href="https://podcasts.apple.com/us/podcast/tu-hora-divina/id1659299472">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <Link href="https://soundcloud.com/tu-hora-divina?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src="/images/soundcloud-podcast.png"
                width="100"
                height="38"
                alt="Escúchalo en Soundcloud"
              />
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link href="https://castbox.fm/channel/id5241199?country=mx">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
