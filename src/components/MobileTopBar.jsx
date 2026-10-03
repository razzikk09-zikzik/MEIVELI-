import { useNavigate } from 'react-router-dom';

export default function MobileTopBar({ language, onLanguageToggle }) {
  const navigate = useNavigate();
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button 
          onClick={() => onLanguageToggle(language === 'en' ? 'ta' : 'en')} 
          style={{ background: '#F1F5F9', border: 'none', borderRadius: '0.25rem', padding: '0.125rem 0.375rem', fontSize: '0.65rem', fontWeight: 700, color: '#2563EB', cursor: 'pointer' }}
        >
          {language === 'en' ? 'EN' : 'TA'}
        </button>

        <button id="analyst-access-btn" style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', border: '1px solid #7C3AED', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="0.6rem" height="0.6rem" viewBox="0 0 24 24" fill="#7C3AED"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid #E6EAF2', borderRadius: '1rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
          <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>South Chennai</span>
          <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <button style={{ position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ position: 'absolute', top: '-0.125rem', right: '-0.125rem', width: '6px', height: '6px', background: '#EF4444', borderRadius: '50%' }} />
        </button>
      </div>
    </div>
  );
}
