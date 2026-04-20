// src/pages/FieldDetail.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FIELDS_DB } from '../data/fields';
import styles from './FieldDetail.module.css';

function findField(id) {
  for (const city of Object.values(FIELDS_DB)) {
    const f = city.find(f => f.id === id);
    if (f) return f;
  }
  return null;
}

const TYPE_ICON = { turf: '🏟️', park: '🌳', ground: '⚽' };

export default function FieldDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const field = findField(id);

  if (!field) {
    return (
      <>
        <Header />
        <div className={styles.notFound}>
          <h2>Field not found</h2>
          <Link to="/">← Back to search</Link>
        </div>
      </>
    );
  }

  const mapQuery = encodeURIComponent(`${field.name} ${field.address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${field.lat},${field.lng}&z=16&output=embed`;

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `${field.name} — Field Findr`, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href).then(() => alert('Link copied!'));
    }
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <Header />
      <main className={styles.main}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={`${styles.icon} ${styles[field.type]}`}>
              {TYPE_ICON[field.type]}
            </div>
            <div>
              <h1 className={styles.name}>{field.name}</h1>
              <div className={styles.badges}>
                <span className={`${styles.badge} ${styles[`b_${field.type}`]}`}>
                  {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                </span>
                <span className={`${styles.badge} ${field.isPaid ? styles.b_paid : styles.b_free}`}>
                  {field.isPaid ? 'Paid' : 'Free entry'}
                </span>
                {field.area >= 10000 && (
                  <span className={`${styles.badge} ${styles.b_large}`}>Large field</span>
                )}
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className={styles.mapWrap}>
            <iframe
              src={embedUrl}
              title={`Map of ${field.name}`}
              loading="lazy"
            />
          </div>

          {/* DETAIL GRID */}
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.dl}>Address</span>
              <span className={styles.dv}>{field.address}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.dl}>Area</span>
              <span className={styles.dv}>
                {field.area >= 10000
                  ? `${(field.area / 1000).toFixed(0)}k sqm`
                  : `${field.area} sqm`}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.dl}>Hours</span>
              <span className={styles.dv}>{field.hours || '—'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.dl}>Entry</span>
              <span className={styles.dv}>{field.isPaid ? 'Paid' : 'Free'}</span>
            </div>
            {field.phone && (
              <div className={styles.detailItem}>
                <span className={styles.dl}>Phone</span>
                <a href={`tel:${field.phone}`} className={styles.dvLink}>{field.phone}</a>
              </div>
            )}
            <div className={styles.detailItem}>
              <span className={styles.dl}>Distance</span>
              <span className={styles.dv}>{field.distKm ? `~${field.distKm.toFixed(1)} km from city centre` : '—'}</span>
            </div>
          </div>

          {/* SPORTS */}
          {field.sports?.length > 0 && (
            <div className={styles.sportsRow}>
              <span className={styles.dl}>Sports played</span>
              <div className={styles.sportTags}>
                {field.sports.map(s => (
                  <span key={s} className={styles.sportTag}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* NOTE */}
          {field.notes && (
            <div className={styles.noteBox}>
              💡 {field.notes}
            </div>
          )}

          {/* ACTIONS */}
          <div className={styles.actions}>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.btnDir}>
              📍 Open in Google Maps
            </a>
            {field.phone && (
              <a href={`tel:${field.phone}`} className={styles.btnPhone}>
                📞 Call to book
              </a>
            )}
            <button className={styles.btnShare} onClick={handleShare}>
              Share this field ↗
            </button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        Field Findr &nbsp;·&nbsp; <Link to="/">Search more fields</Link>
      </footer>
    </>
  );
}
