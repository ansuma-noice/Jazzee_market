// pages/login.tsx
"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import RegisterForms from './RegisterForms';
import Link from 'next/link';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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

        <Link href="/register" className={styles.link}>
        new user?Register →
      </Link>
      </form>
    </div>
  );
};

export default Login;
