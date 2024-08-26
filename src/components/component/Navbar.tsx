// components/Navbar.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import styles from './Navbar.module.css';

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
      <div>
        <Button>Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
