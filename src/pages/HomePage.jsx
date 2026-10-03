import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScamMap from '../components/ScamMap';
import { reportTiles, scamCards } from '../data/mock';

export default function HomePage() {
  const [text, setText] = useState('');
  const [supportsSpeech] = useState('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #E6EAF2',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(16,24,40,0.05)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  };

  const renderMobile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 3. Heading */}
      <div style={{ marginTop: '8px' }}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: '28px', fontWeight: 700, color: '#0F1B4C', lineHeight: 1.1 }}>Check. Stay Safe.</h1>
        <p style={{ color: '#475E8A', fontSize: '18px', marginTop: '4px' }}>Stop scams before you click.</p>
      </div>

      {/* 4. Input Card */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #D5DDEE',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '120px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <textarea
          id="scam-check-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste a message, link, or upload a screenshot"
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
            background: 'transparent',
            padding: '12px',
            fontFamily: "var(--font-body)",
            fontSize: '16px',
            color: '#0F1B4C',
            resize: 'none',
            outline: 'none',
            minHeight: '80px'
          }}
        />
        <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', background: '#E4EDFF', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
            {supportsSpeech && (
              <button style={{ width: '40px', height: '40px', background: '#E4EDFF', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </button>
            )}
            <button
              onClick={async () => {
                try {
                  const clip = await navigator.clipboard.readText();
                  setText((prev) => prev + (prev ? ' ' : '') + clip);
                  document.getElementById('scam-check-input').focus();
                } catch(e) {}
              }}
              style={{ width: '40px', height: '40px', background: '#E4EDFF', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
          </div>
          <span style={{ fontSize: '14px', color: '#94a3b8', paddingBottom: '4px' }}>{text.length}/1000</span>
        </div>
      </div>

      {/* 5 & 6. Check Button & Chips */}
      <div>
        <button
          onClick={() => { if (text.trim()) navigate('/result', { state: { text } }); }}
          disabled={!text.trim()}
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '28px',
            border: 'none',
            background: !text.trim() ? '#E8EEFA' : 'linear-gradient(90deg, #1D6FF2 0%, #7C5CF5 100%)',
            color: !text.trim() ? '#8BA1CC' : '#fff',
            fontFamily: "var(--font-head)",
            fontWeight: '600',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: !text.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Check for Scam
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#475E8A', marginTop: '16px', marginBottom: '12px' }}>
          Supports <span style={{ fontFamily: "var(--font-tamil)" }}>தமிழ்</span> · English · Tanglish · Private by default
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            { label: 'Bank KYC', icon: <><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></>, color: '#E11D48', bg: '#FDE8EC' },
            { label: 'Courier', icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, color: '#EA580C', bg: '#FFEDD5' },
            { label: 'UPI', icon: <><path d="M6 3h12M6 8h12M9 13l3 3 3-3M12 3v13"/></>, color: '#9333EA', bg: '#F3E8FF' },
            { label: 'Electricity', icon: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>, color: '#D97706', bg: '#FEF3C7' },
            { label: 'Job scam', icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>, color: '#2563EB', bg: '#DBEAFE' }
          ].map(chip => (
            <button
              key={chip.label}
              onClick={() => {
                if (chip.label === 'Bank KYC') {
                  setText("Sir ungal SBI account block aagidum. Inga click pannunga: sbi-kyc-update.in/verify");
                } else {
                  setText(`${chip.label} sample message...`);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: '#fff',
                border: '1px solid #D5DDEE',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: "var(--font-head)",
                fontWeight: '600',
                fontSize: '14px',
                color: '#0F1B4C',
                height: '40px'
              }}
            >
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: chip.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" stroke={chip.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{chip.icon}</svg>
              </div>
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Report Button */}
      <button
        onClick={() => navigate('/report')}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '14px',
          border: '1px solid #E11D48',
          background: '#FFF5F5',
          color: '#E11D48',
          fontFamily: "var(--font-head)",
          fontWeight: '700',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Report a scam
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', marginRight: '8px' }}><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* 8. Live Alerts */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '20px', color: '#0F1B4C', lineHeight: 1.1 }}>Live alerts</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#475E8A', marginTop: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#25D366' }} />
                Updated 5 min ago
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/threats')} style={{ fontSize: '15px', color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            View all <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { id: 0, title: 'Active scam campaign', desc: '14 reports this week', area: 'Velachery', time: '2 hrs ago', risk: 'HIGH', tint: '#FFF7E6', iconBg: '#FFEDD5', iconColor: '#EA580C', icon: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></> },
            { id: 1, title: 'Bank KYC Impersonation', desc: 'Fake bank messages asking for OTP', area: 'Adyar', time: '4 hrs ago', risk: 'HIGH', tint: '#FFF5F5', iconBg: '#FDE8EC', iconColor: '#E11D48', icon: <><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></> },
            { id: 2, title: 'Courier Refund Scam', desc: 'Fake delivery links asking for payment', area: 'Sholinganallur', time: 'Today', risk: 'MEDIUM', tint: '#FFFBEB', iconBg: '#FEF3C7', iconColor: '#D97706', icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> }
          ].map(card => {
            const isHigh = card.risk === 'HIGH';
            const badgeBg = isHigh ? '#FEE2E2' : '#FFEDD5';
            const badgeColor = isHigh ? '#E11D48' : '#D97706';
            
            return (
              <div
                key={card.id}
                onClick={() => navigate('/threats')}
                style={{
                  background: card.tint,
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke={card.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '16px', color: '#0F1B4C' }}>{card.title}</div>
                    <span style={{ background: badgeBg, color: badgeColor, padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', fontFamily: "var(--font-body)", letterSpacing: '0.5px' }}>
                      {card.risk}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#475E8A', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {card.desc}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '13px', color: '#475E8A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563EB', fontWeight: '500' }}>
                      <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {card.area}
                    </div>
                    <span style={{ color: '#CBD5E1' }}>|</span>
                    {card.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <style>{`
        /* Hide scrollbar for chips */
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );

  const renderDesktop = () => (
    <div style={{ display: 'contents' }}>
      {/* ══ ROW 1: Input card + Map card ══ */}
      <div className="top-row-flex" style={{ display: 'flex', gap: '0.75rem', minHeight: 0 }}>
        
        {/* ── Left: Is this suspicious? ── */}
        <div style={{ ...cardStyle, flex: 1, position: 'relative' }}>
          {/* Header */}
          <div style={{ display: 'flex', gap: '0.875rem', padding: '1.25rem 1.25rem 0.5rem', background: '#fff' }}>
            <div
              style={{
                width: '1.5rem',
                height: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '0.125rem'
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
                background: '#fff',
                border: '1px solid #E6EAF2',
                borderRadius: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: '6rem',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#93C5FD'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E6EAF2'}
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
                  fontSize: 'max(16px, 0.875rem)',
                  color: '#1e293b',
                  resize: 'none',
                  outline: 'none',
                }}
              />
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E6EAF2' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.25rem', background: '#fff', border: '1px solid #E6EAF2', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex' }}>
                    <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </button>
                  {supportsSpeech && (
                    <button style={{ padding: '0.25rem', background: '#fff', border: '1px solid #E6EAF2', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex' }}>
                      <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{text.length}/1000</span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#475569' }}>
              Supports <span style={{ fontFamily: "var(--font-tamil)" }}>தமிழ்</span> · English · Tanglish · Private by default, nothing stored unless you report.
            </div>

            {/* Examples */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Try an example:</span>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {['Bank KYC', 'Courier', 'UPI', 'Electricity', 'Job scam'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setText(tag + " msg... ")}
                    style={{
                      padding: '0.25rem 0.625rem',
                      background: '#fff',
                      border: '1px solid #E6EAF2',
                      borderRadius: '1rem',
                      fontSize: '0.8125rem',
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#93C5FD'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E6EAF2'}
                  >
                    {tag}
                  </button>
                ))}
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
                flexShrink: 0,
              }}
            >
              Check Now
              <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* ── Right: Map Card ── */}
        <div className="map-card-wrapper" style={{ ...cardStyle, flex: 1, padding: '1rem 1.25rem', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
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
              background: '#FFF7E6',
              border: '1px solid #FDE68A',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '0.9375rem', color: '#DC2626' }}>
                  Active scam campaign reported
                </div>
                <div className="text-ellipsis-1" style={{ fontFamily: "var(--font-body)", fontSize: '0.8125rem', color: '#475569' }}>
                  in Velachery, 14 reports this week.
                </div>
              </div>
            </div>
            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>

          <div style={{ flex: 1, minHeight: 0, position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #E6EAF2' }}>
            <ScamMap />
          </div>
        </div>
      </div>

      {/* ══ ROW 2: Report a scam ══ */}
      <div style={{ ...cardStyle, padding: '0.75rem 1rem', gap: '0.75rem', flexShrink: 0, marginTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.125rem', color: '#0f172a', lineHeight: 1 }}>
            Report a scam
          </h2>
          <span style={{ fontSize: '0.875rem', color: '#475569', marginLeft: '0.25rem' }}>What did you receive?</span>
        </div>

        <div className="report-tiles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
          {reportTiles.map(tile => {
            const isWhatsapp = tile.id === 'whatsapp';
            return (
              <button
                key={tile.id}
                style={{
                  background: '#fff',
                  border: '1px solid #E6EAF2',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.375rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  height: '5rem',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(37,99,235,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E6EAF2'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={tile.iconUrl} alt={tile.label} style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', filter: isWhatsapp ? 'none' : 'invert(27%) sepia(85%) saturate(2331%) hue-rotate(212deg) brightness(97%) contrast(92%)' }} />
                </div>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ══ ROW 3: Common Scams ══ */}
      <div style={{ ...cardStyle, padding: '0.75rem 1rem', gap: '0.75rem', flexShrink: 0, marginTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.05rem', color: '#0f172a' }}>
              Common scams you should know about
            </h2>
          </div>
          <a href="#" style={{ fontSize: '0.875rem', color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
            View all scams →
          </a>
        </div>

        <div className="scam-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {scamCards.map((card) => {
            const isHigh = card.risk === 'high';
            const bgTint = isHigh ? '#FFF5F5' : '#FFFBEB';
            const badgeBg = isHigh ? '#FEE2E2' : '#FEF3C7';
            const badgeColor = isHigh ? '#B91C1C' : '#B45309';
            const iconColor = isHigh ? 'invert(16%) sepia(91%) saturate(7351%) hue-rotate(358deg) brightness(94%) contrast(114%)' : 'invert(52%) sepia(61%) saturate(3065%) hue-rotate(1deg) brightness(102%) contrast(105%)';

            return (
              <div
                key={card.id}
                style={{
                  border: '1px solid #E6EAF2',
                  borderRadius: '0.5rem',
                  background: bgTint,
                  padding: '0.5rem 0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  minWidth: 0,
                  height: '5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={card.iconUrl} alt="" style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain', filter: iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="text-ellipsis-1" style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>
                      {card.title}
                    </h3>
                    <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.125rem' }}>
                    <span
                      style={{
                        background: badgeBg,
                        color: badgeColor,
                        padding: '0.125rem 0.5rem',
                        borderRadius: '1rem',
                        fontSize: '0.625rem',
                        fontWeight: '700',
                        fontFamily: "var(--font-body)",
                        textTransform: 'uppercase',
                        flexShrink: 0,
                      }}
                    >
                      {card.risk} RISK
                    </span>
                  </div>
                  <p className="text-ellipsis-1" style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.1875rem' }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );

  return isMobile ? renderMobile() : renderDesktop();
}
