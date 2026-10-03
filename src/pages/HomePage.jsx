// src/pages/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScamMap from '../components/ScamMap';
import { reportTiles, scamCards } from '../data/mock';

export default function HomePage() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '0.875rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100%',
      }}
    >
      {/* ══ ROW 1: Input card + Map card ══ */}
      <div className="top-row-flex" style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: '18rem' }}>
        
        {/* ── Left: Is this suspicious? ── */}
        <div
          style={{
            flex: 1,
            background: '#fff',
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '0 4px 20px rgba(60,80,180,0.08)',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient top border */}
          <div style={{ height: '3px', background: 'linear-gradient(to right, #1D6FF2, #7C5CF5)', width: '100%' }} />

          {/* Header */}
          <div style={{ display: 'flex', gap: '0.875rem', padding: '1.25rem 1.25rem 0.5rem', background: 'linear-gradient(180deg, #EFF6FF 0%, transparent 100%)' }}>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: '#DBEAFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.25rem', color: '#0f172a' }}>
                Is this suspicious?
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: '0.8125rem', color: '#64748b' }}>
                Check a message, URL or screenshot before you click.
              </p>
            </div>
          </div>

          <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
            {/* Textarea Area */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '0.625rem',
                display: 'flex',
                flexDirection: 'column',
                height: '8rem',
              }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste a message, link, or drop a screenshot here"
                style={{
                  flex: 1,
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  padding: '0.75rem 0.875rem',
                  fontFamily: "var(--font-body)",
                  fontSize: '0.875rem',
                  color: '#1e293b',
                  resize: 'none',
                  outline: 'none',
                }}
              />
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.25rem', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex' }}>
                    <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </button>
                  <button style={{ padding: '0.25rem', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex' }}>
                    <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                  </button>
                </div>
                <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{text.length}/1000</span>
              </div>
            </div>

            <button
              onClick={() => { if (text.trim()) navigate('/result', { state: { text } }); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '2rem',
                border: 'none',
                background: 'linear-gradient(90deg, #1D6FF2 0%, #7C5CF5 100%)',
                color: '#fff',
                fontFamily: "var(--font-head)",
                fontWeight: '700',
                fontSize: '0.9375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                boxShadow: '0 4px 12px rgba(29, 111, 242, 0.25)',
              }}
            >
              Check Now
              <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#334155' }}>
              Supports <span style={{ fontFamily: "var(--font-tamil)" }}>தமிழ்</span> · English · Tanglish · Private by default, nothing stored unless you report.
            </div>
            
            {/* Examples */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Try an example:</span>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {['Bank KYC', 'Courier', 'UPI', 'Electricity', 'Job scam'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setText(tag + " msg... ")}
                    style={{
                      padding: '0.25rem 0.625rem',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      color: '#1D4ED8',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#60A5FA'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#BFDBFE'}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Map Card ── */}
        <div
          className="map-card-wrapper"
          style={{
            flex: 1,
            background: '#fff',
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '0 4px 20px rgba(60,80,180,0.08)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '1.125rem', color: '#0f172a' }}>
                Scams reported near you
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: '#16A34A', fontWeight: '600' }}>
              <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#16A34A' }} />
              Updated 5 min ago
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(to right, #FFF4E0, #FFE9C7)',
              borderLeft: '4px solid #F59E0B',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="#EA580C" style={{flexShrink: 0}}>
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '0.9375rem', color: '#DC2626' }}>
                  Active scam campaign reported
                </div>
                <div className="text-ellipsis-1" style={{ fontFamily: "var(--font-body)", fontSize: '0.8125rem', color: '#334155' }}>
                  in Velachery, 14 reports this week.
                </div>
              </div>
            </div>
            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>

          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
            <ScamMap />
          </div>
        </div>
      </div>

      {/* ══ ROW 2: Report a scam ══ */}
      <div
        style={{
          background: '#fff',
          borderRadius: '1rem',
          border: 'none',
          boxShadow: '0 4px 20px rgba(60,80,180,0.08)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.125rem', color: '#0f172a', lineHeight: 1 }}>
            Report a scam
          </h2>
          <span style={{ fontSize: '0.875rem', color: '#334155', marginLeft: '0.25rem' }}>What did you receive?</span>
        </div>

        <div className="report-tiles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
          {reportTiles.map(tile => {
            let bgTint = '#EFF6FF'; // default blue
            if (tile.id === 'call' || tile.id === 'whatsapp') bgTint = '#DCFCE7';
            else if (tile.id === 'upi') bgTint = '#FEE2E2';
            else if (tile.id === 'job') bgTint = '#F3E8FF';
            let borderColor = bgTint === '#EFF6FF' ? '#BFDBFE' : bgTint === '#DCFCE7' ? '#BBF7D0' : bgTint === '#FEE2E2' ? '#FECACA' : '#E9D5FF';
            let hoverBorder = bgTint === '#EFF6FF' ? '#60A5FA' : bgTint === '#DCFCE7' ? '#86EFAC' : bgTint === '#FEE2E2' ? '#F87171' : '#C084FC';

            return (
              <button
                key={tile.id}
                style={{
                  background: bgTint,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = hoverBorder; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={tile.iconUrl} alt={tile.label} style={{ width: '2.75rem', height: '2.75rem', objectFit: 'contain' }} />
                </div>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '0.875rem', color: '#1e293b' }}>{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ══ ROW 3: Common Scams ══ */}
      <div
        style={{
          background: '#fff',
          borderRadius: '1rem',
          border: 'none',
          boxShadow: '0 4px 20px rgba(60,80,180,0.08)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.125rem', color: '#0f172a' }}>
              Common scams you should know about
            </h2>
          </div>
          <a href="#" style={{ fontSize: '0.875rem', color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
            View all scams →
          </a>
        </div>

        <div className="scam-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {scamCards.map((card, i) => (
            <div
              key={card.id}
              style={{
                border: '1px solid #E8EDF5',
                borderRadius: '0.75rem',
                background: card.risk === 'high' ? 'linear-gradient(to right, #FEF2F2, #fff)' : 'linear-gradient(to right, #FFFBEB, #fff)',
                padding: '0.875rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                cursor: 'pointer',
                minWidth: 0,
              }}
            >
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <img src={card.iconUrl} alt="" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="text-ellipsis-1" style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '0.9375rem', color: '#0f172a' }}>
                    {card.title}
                  </h3>
                  <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                  <span
                    style={{
                      background: card.risk === 'high' ? '#DC2626' : '#EA580C',
                      color: '#fff',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '1rem',
                      fontSize: '0.625rem',
                      fontWeight: '800',
                      fontFamily: "var(--font-head)",
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    {card.risk} RISK
                  </span>
                </div>
                <p className="text-ellipsis-1" style={{ fontSize: '0.8125rem', color: '#334155', marginTop: '0.375rem' }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
