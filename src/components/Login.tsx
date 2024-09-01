"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint = '';
    let body = {};

    switch (designation) {
      case 'student':
        endpoint = '/pages/api/login/Student';
        body = { email, password };
        break;
      case 'recruiter':
        endpoint = '/pages/api/login/Recruiter';
        body = { workEmail: email, password };
        break;
      case 'campus':
        endpoint = '/pages/api/login/Campus';
        body = { coordinatorEmail: email, password };
        break;
      default:
        setError('Please select a valid designation.');
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.exists) {
        // Redirect based on designation
        if (designation === 'recruiter') {
          router.push('/Filter'); // Redirect to recruiter page
        } else if (designation === 'student') {
          router.push('/Recruiterio'); // Redirect to recruitee page
        } else if (designation === 'campus') {
          router.push('/Recruiterio'); // Redirect to campus page
        }
      } else {
        setError(data.message || 'Invalid credentials.');
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
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className={styles.select}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Select Designation</option>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
          <option value="campus">Campus</option>
        </select>
        <button type="submit" className={styles.button}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <Link href="/register" className={styles.link}>
          New user? Register →
        </Link>
      </form>
    </div>
  );
};

export default Login;
