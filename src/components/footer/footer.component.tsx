import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      &copy; {year} Radio Tu Hora Divina
    </footer>
  );
};

export default Footer;
