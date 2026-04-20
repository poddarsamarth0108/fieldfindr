// src/components/FieldCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FieldCard.module.css';

const TYPE_ICON = { turf: '🏟️', park: '🌳', ground: '⚽' };
const TYPE_LABEL = { turf: 'Turf', park: 'Park', ground: 'Ground' };

function formatArea(sqm) {
  return sqm >= 10000 ? `${(sqm / 1000).toFixed(0)}k sqm` : `${sqm} sqm`;
}

export default function FieldCard({ field }) {
  const mapQuery = encodeURIComponent(`${field.name} ${field.address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  function handleShare(e) {
    e.preventDefault();
    const url = window.location.origin + `/field/${field.id}`;
    if (navigator.share) {
      navigator.share({ title: `${field.name} — Field Findr`, url });
    } else {
      navigator.clipboard?.writeText(url).then(() => alert('Link copied!'));
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.icon} ${styles[field.type]}`}>
          {TYPE_ICON[field.type]}
        </div>
        <div className={styles.info}>
          <Link to={`/field/${field.id}`} className={styles.name}>{field.name}</Link>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles[`b_${field.type}`]}`}>
              {TYPE_LABEL[field.type]}
            </span>
            <span className={`${styles.badge} ${field.isPaid ? styles.b_paid : styles.b_free}`}>
              {field.isPaid ? 'Paid' : 'Free'}
            </span>
            {field.area >= 10000 && (
              <span className={`${styles.badge} ${styles.b_large}`}>Large</span>
            )}
          </div>
          <div className={styles.addr}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            {field.address}
          </div>
        </div>
        {field.distKm && (
          <div className={styles.dist}>{field.distKm.toFixed(1)} km</div>
        )}
      </div>

      {field.notes && (
        <div className={styles.note}>💡 {field.notes}</div>
      )}

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Area</span>
          <span className={styles.detailValue}>{formatArea(field.area)}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Hours</span>
          <span className={styles.detailValue}>{field.hours || '—'}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Entry</span>
          <span className={styles.detailValue}>{field.isPaid ? 'Paid' : 'Free'}</span>
        </div>
      </div>

      {field.sports?.length > 0 && (
        <div className={styles.sports}>
          {field.sports.map(s => (
            <span key={s} className={styles.sportTag}>{s}</span>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnDir}
        >
          📍 Directions
        </a>
        {field.phone && (
          <a href={`tel:${field.phone}`} className={styles.btnPhone}>
            📞 {field.phone}
          </a>
        )}
        <button className={styles.btnShare} onClick={handleShare}>
          Share ↗
        </button>
      </div>
    </article>
  );
}
