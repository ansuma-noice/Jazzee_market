// /pages/login.tsx

"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          // Handle successful login or redirection
          console.log('User exists, designation:', data.designation);
        }
      } else {
        const data = await response.json();
        setError(data.message); // Show error if user does not exist
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className={styles.select}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="Select designation">Select Designation</option>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
          <option value="campus">Campus</option>
        </select>
        <button type="submit" className={styles.button}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <Link href="/register" className={styles.link}>
          new user? Register →
        </Link>
      </form>
    </div>
  );
};

export default Login;
