// pages/RegisterSteps.tsx

import Link from 'next/link';
import styles from './RegisterSteps.module.css';

export default function RegisterSteps() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hire/Get Hired in Only 3 Steps with Zazzee</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h2>Step 1</h2>
          <p>User Registration</p>
        </div>
        <div className={styles.arrow}>&rarr;</div>
        <div className={styles.card}>
          <h2>Step 2</h2>
          <p>Choose Your Sector</p>
        </div>
        <div className={styles.arrow}>&rarr;</div>
        <div className={styles.card}>
          <h2>Step 3</h2>
          <p>Hire/Get Hired</p>
        </div>
      </div>
      <Link href="/get-started" className={styles.getStartedButton}>
        Get Started →
      </Link>
    </div>
  );
}
