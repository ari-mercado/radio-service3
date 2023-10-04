import React from 'react';
import Nav from '../nav/nav.component';
import styles from './header.module.scss';
import PodcastList from '../podcast-list/podcast-list.component';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topContainer}>
        <h1 className={styles.headerTitle}>Tu Hora Divina</h1>
        <PodcastList />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
