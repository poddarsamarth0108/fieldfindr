// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8"/>
              <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="1.2"/>
              <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.4"/>
              <line x1="2" y1="12" x2="5.5" y2="12" stroke="white" strokeWidth="1.2"/>
              <line x1="18.5" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.2"/>
            </svg>
          </div>
          <span className={styles.logoText}>Field <span>Findr</span></span>
        </Link>
        <span className={styles.tag}>Find. Play. Repeat.</span>
      </div>
    </header>
  );
}
