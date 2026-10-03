import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileTopBar({ language, onLanguageToggle }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 0.75rem',
        height: '64px',
        background: '#ffffff',
        borderBottom: '1px solid #E6EAF2',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/assets/logo.png" alt="MEYVIZHI" style={{ height: '36px', objectFit: 'contain' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid #E6EAF2', borderRadius: '1rem', padding: '0.375rem 0.625rem', cursor: 'pointer' }}>
          <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>South Chennai</span>
          <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ position: 'absolute', top: '-0.125rem', right: '-0.125rem', width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }} />
        </button>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '2.5rem', right: 0, background: '#fff', border: '1px solid #E6EAF2', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', minWidth: '160px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>Language</span>
              <button 
                onClick={() => { onLanguageToggle(language === 'en' ? 'ta' : 'en'); setMenuOpen(false); }} 
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', cursor: 'pointer' }}
              >
                {language === 'en' ? 'EN' : 'TA'}
              </button>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #E6EAF2', margin: '0' }} />
            <button id="analyst-access-btn" onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: '1px solid #7C3AED', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="#7C3AED"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
              </div>
              <span style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 500 }}>Analyst Access</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
