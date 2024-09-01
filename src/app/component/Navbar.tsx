"use client";

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface NavbarProps {
  onSearch: (searchTerm: string) => void; // Prop to handle search
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Trigger the search functionality
  };

  return (
    <nav className={`${scrolled ? styles.scrolled : styles.navbar}`}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/JAZZEE3.png" alt="Company Logo" />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <Search className={styles.searchIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
