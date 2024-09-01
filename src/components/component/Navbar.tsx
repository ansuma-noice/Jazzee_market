// components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/JAZZEE3.png" alt="Company Logo" />
        </Link>
      </div>
      <Link href="/login" className={styles.getStartedButton}>
        Login →
      </Link>
    </nav>
  );
};

export default Navbar;
