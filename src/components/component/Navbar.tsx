// components/Navbar.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
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
        <img src="/jazzee2.png" alt="Company Logo" />
      </div>
      <Link href="/register" className={styles.getStartedButton}>
        Register→
      </Link>
    </nav>
  );
};

export default Navbar;
