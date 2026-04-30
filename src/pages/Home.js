import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import FieldCard from '../components/FieldCard';
import MapView from '../MapView';
import { searchFields, CITIES, FIELDS_DB } from '../data/fields';
import styles from './Home.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'turf', label: 'Turfs only' },
  { key: 'free', label: 'Free entry' },
  { key: 'large', label: 'Large (10k+ sqm)' },
];

const SORTS = [
  { key: 'dist', label: 'Nearest first' },
  { key: 'size', label: 'Largest first' },
  { key: 'name', label: 'A – Z' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // null = no search yet
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dist');
  const [searchedCity, setSearchedCity] = useState('');

  function doSearch(city) {
    const q = (city || query).trim();
    if (!q) return;
    setSearchedCity(q);
    const data = searchFields(q);
    if (!data) {
      setResults(null);
      setNotFound(true);
    } else {
      setResults(data);
      setNotFound(false);
      setFilter('all');
    }
  }

  const displayed = useMemo(() => {
    if (!results) return [];
    let list = [...results];
    if (filter === 'turf') list = list.filter(f => f.type === 'turf');
    else if (filter === 'free') list = list.filter(f => !f.isPaid);
    else if (filter === 'large') list = list.filter(f => f.area >= 10000);
    if (sort === 'dist') list.sort((a, b) => (a.distKm || 99) - (b.distKm || 99));
    else if (sort === 'size') list.sort((a, b) => (b.area || 0) - (a.area || 0));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [results, filter, sort]);

  const stats = useMemo(() => {
    if (!results) return null;
    return {
      total: results.length,
      free: results.filter(f => !f.isPaid).length,
      turfs: results.filter(f => f.type === 'turf').length,
    };
  }, [results]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Find your <em>perfect pitch</em>
        </h1>
        <p className={styles.heroSub}>
          Parks, grounds &amp; turfs — free and paid, across India
        </p>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="Enter your city (e.g. Patna, Mumbai, Delhi…)"
            className={styles.searchInput}
            autoComplete="off"
          />
          <button className={styles.searchBtn} onClick={() => doSearch()}>
            Search
          </button>
        </div>
        <div className={styles.chips}>
          {['Patna','Mumbai','Delhi','Bengaluru','Kolkata','Hyderabad','Pune'].map(c => (
            <button key={c} className={styles.chip} onClick={() => { setQuery(c); doSearch(c); }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS */}
      {results && (
        <div className={styles.filtersBar}>
          <div className={styles.filterChips}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.filterChip} ${filter === f.key ? styles.on : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORTS.map(s => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      <main className={styles.main}>

        {/* NOT FOUND */}
        {notFound && (
          <div className={styles.notFoundBox}>
            <strong>📍 &ldquo;{searchedCity}&rdquo; isn&apos;t in our database yet</strong>
            <p>
              Currently covered: {Object.keys(FIELDS_DB).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}.
              Want your city added?{' '}
              <a href={`mailto:fieldfindr@gmail.com?subject=Add ${searchedCity} to Field Findr`}>
                Email us
              </a>.
            </p>
            <div className={styles.cityButtons}>
              {CITIES.map(c => (
                <button key={c} className={styles.cityBtn} onClick={() => { setQuery(c); doSearch(c); }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STATS */}
        {stats && (
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{stats.total}</span>
              <span className={styles.statLabel}>Fields found</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{stats.free}</span>
              <span className={styles.statLabel}>Free access</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{stats.turfs}</span>
              <span className={styles.statLabel}>Turfs</span>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {results && (
          <>
            <p className={styles.resultsCount}>
              {displayed.length} field{displayed.length !== 1 ? 's' : ''} in {searchedCity}
            </p>
            {displayed.length === 0 ? (
              <div className={styles.emptyState}>
                <span>🔍</span>
                <h3>No results</h3>
                <p>Try removing a filter.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {displayed.map(f => <FieldCard key={f.id} field={f} />)}
              </div>
            )}
            <MapView grounds={displayed} key={displayed.length} />
          </>
        )}
        

        {/* WELCOME STATE */}
        {!results && !notFound && (
          <>
            <div className={styles.welcome}>
              <div className={styles.welcomeIcon}>⚽</div>
              <h2>Find a field, start playing</h2>
              <p>Search your city to discover parks, cricket grounds, football pitches and paid turfs.</p>
            </div>

            <div className={styles.howSection}>
              <h3 className={styles.sectionTitle}>How it works</h3>
              <div className={styles.steps}>
                {[
                  { n: '1', h: 'Enter your city', p: 'Type any supported city or tap a quick chip' },
                  { n: '2', h: 'Browse fields', p: 'Filter by type, price or size and sort instantly' },
                  { n: '3', h: 'Get directions', p: 'Tap any field to open Google Maps and go' },
                ].map(s => (
                  <div key={s.n} className={styles.step}>
                    <div className={styles.stepNum}>{s.n}</div>
                    <h4>{s.h}</h4>
                    <p>{s.p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.citiesSection}>
              <h3 className={styles.sectionTitle}>Cities covered</h3>
              <div className={styles.cityButtons}>
                {CITIES.map(c => (
                  <button key={c} className={styles.cityBtn} onClick={() => { setQuery(c); doSearch(c); }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        Field Findr &nbsp;·&nbsp; Made for players across India &nbsp;·&nbsp;
        <a href="mailto:fieldfindr@gmail.com"> Suggest a field</a>
      </footer>
    </>
  );
}
