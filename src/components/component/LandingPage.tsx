// components/LandingPage.tsx
import React from 'react';
import Carousel from './component';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingPage}>
      <h1 className={`${styles.headline} ${styles.funkyFont}`}>Connecting Talent, Crafting Futures</h1>
      <div className={styles.carouselContainer}>
        <Carousel />
      </div>
    </div>
  );
};

export default LandingPage;
