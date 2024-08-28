'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from './../services/api';
import styles from './signup.module.css';
import axios from 'axios';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { user, tokens } = await api.register(username, email, password);
      console.log('user: ', user)
      console.log("tokens: ", tokens)
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred during signup. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="input"
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className="btn">Sign Up</button>
    </form>
  );
}