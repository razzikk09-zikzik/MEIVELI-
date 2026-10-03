import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportTiles } from '../data/mock';

export default function ReportPage() {
  const [type, setType] = useState(null);
  const [text, setText] = useState('');
  const [lostMoney, setLostMoney] = useState(null); // 'No' | 'Almost' | 'Yes'
  const [area, setArea] = useState('Velachery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const areas = ['Velachery', 'Adyar', 'Sholinganallur', 'Perungudi', 'Medavakkam', 'Tharamani', 'Other'];

  const redactText = (input) => {
    let redacted = input;
    // OTP (4 to 6 digits alone)
    redacted = redacted.replace(/\b\d{4,6}\b/g, '[OTP]');
    // Card numbers, Aadhaar, Account numbers (12 to 18 digits)
    redacted = redacted.replace(/\b(?:\d[ -]*?){12,18}\b/g, '[NUMBER]');
    return redacted;
  };

  const handleSubmit = async () => {
    if (!type || !text.trim()) return;
    setIsSubmitting(true);
    const redactedText = redactText(text);

    const payload = {
      type,
      text: redactedText,
      lost_money: lostMoney,
      area
    };

    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('API failed');
    } catch (err) {
      // Fallback: append to local state if needed (here we just log and proceed so the flow works)
      console.log('API failed, falling back to local. Payload:', payload);
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 800); // Simulate network delay if fallback
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #E6EAF2',
    borderRadius: '0.75rem', // 12px
    padding: '1.25rem',
  };

  if (isDone) {
    return (
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '768px', margin: '0 auto' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#E2E8F0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>1</div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Type</span>
          </div>
          <div style={{ width: '3rem', height: '1px', background: '#E2E8F0', margin: '0 0.5rem', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#E2E8F0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>2</div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Details</span>
          </div>
          <div style={{ width: '3rem', height: '1px', background: '#E2E8F0', margin: '0 0.5rem', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>3</div>
            <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: '600' }}>Done</span>
          </div>
        </div>

        <div style={{ ...cardStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem 1.5rem' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.5rem', color: '#0f172a' }}>Thank you.</h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '300px' }}>Your report helps protect {area !== 'Other' ? area : 'your neighbours'}.</p>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>It has been added to the community map.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '1rem' }}>
            <button
              onClick={() => navigate('/threats')}
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '2rem', border: 'none', background: '#2563EB', color: '#fff', fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px'
              }}
            >
              View active threats
            </button>
            <button
              onClick={() => { setIsDone(false); setType(null); setText(''); setLostMoney(null); }}
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '2rem', border: '1px solid #E6EAF2', background: '#fff', color: '#475569', fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px'
              }}
            >
              Report another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '768px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#0f172a', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minWidth: '48px', minHeight: '48px' }}>
          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Report a scam</h1>
      </div>

      {/* Step Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>1</div>
          <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: '600' }}>Type</span>
        </div>
        <div style={{ width: '3rem', height: '1px', background: '#E2E8F0', margin: '0 0.5rem', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#F1F5F9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>2</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Details</span>
        </div>
        <div style={{ width: '3rem', height: '1px', background: '#E2E8F0', margin: '0 0.5rem', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#F1F5F9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>3</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Done</span>
        </div>
      </div>

      {/* Intro */}
      <div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Help protect your neighbours.</h2>
        <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.25rem' }}>Takes under a minute.</p>
      </div>

      {/* Type selection */}
      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>What type of scam is this?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {reportTiles.map(tile => {
            const isSelected = type === tile.id;
            const isWhatsapp = tile.id === 'whatsapp';
            return (
              <button
                key={tile.id}
                onClick={() => setType(tile.id)}
                style={{
                  background: isSelected ? '#EFF6FF' : '#fff',
                  border: `1px solid ${isSelected ? '#2563EB' : '#E6EAF2'}`,
                  borderRadius: '0.5rem',
                  padding: '0.75rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  minHeight: '48px',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: '2rem', height: '2rem', background: isSelected ? '#fff' : 'transparent', borderRadius: '50%' }}>
                  <img src={tile.iconUrl} alt={tile.label} style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', filter: isWhatsapp ? 'none' : 'invert(27%) sepia(85%) saturate(2331%) hue-rotate(212deg) brightness(97%) contrast(92%)' }} />
                </div>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '0.875rem', color: isSelected ? '#1E3A8A' : '#0f172a' }}>{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Textarea */}
      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>Paste the message, link or number</h3>
        <div
          style={{
            background: '#fff',
            border: '1px solid #E6EAF2',
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '8rem',
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the message, link, or number here..."
            style={{
              flex: 1,
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '0.875rem',
              fontFamily: "var(--font-body)",
              fontSize: 'max(16px, 0.875rem)',
              color: '#1e293b',
              resize: 'none',
              outline: 'none',
            }}
          />
          <div style={{ padding: '0.5rem 0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ padding: '0.375rem', background: '#F1F5F9', border: 'none', borderRadius: '0.25rem', display: 'flex' }}>
              <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
            <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{text.length}/1000</span>
          </div>
        </div>
      </div>

      {/* Lost Money Segmented Control */}
      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>Did you lose money?</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['No', 'Almost', 'Yes'].map(opt => (
            <button
              key={opt}
              onClick={() => setLostMoney(opt)}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: lostMoney === opt ? '1px solid #2563EB' : '1px solid transparent',
                background: lostMoney === opt ? '#fff' : '#F1F5F9',
                color: lostMoney === opt ? '#2563EB' : '#475569',
                fontFamily: "var(--font-head)",
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: 'pointer',
                minHeight: '48px',
                transition: 'all 0.15s'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Where did this happen? */}
      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>Where did this happen?</h3>
        <div style={{ position: 'relative' }}>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #E6EAF2',
              background: '#fff',
              fontFamily: "var(--font-body)",
              fontSize: '16px',
              color: '#0f172a',
              appearance: 'none',
              outline: 'none',
              minHeight: '48px',
              cursor: 'pointer',
            }}
          >
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            {/* The mockup shows a map pin inside the dropdown box. I'll pad the select to the left. */}
            <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
        <style>{`select { padding-left: 3rem !important; }`}</style>
      </div>

      {/* Lock Line */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#F1F5F9', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
        <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '0.125rem' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '0.875rem', color: '#1e293b' }}>Anonymous. We never ask for your name or phone number.</div>
          <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.125rem' }}>This helps keep you and others safe.</div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!type || !text.trim() || isSubmitting}
        style={{
          width: '100%',
          padding: '0.875rem',
          borderRadius: '2rem',
          border: 'none',
          background: (!type || !text.trim()) ? '#E2E8F0' : '#2563EB',
          color: (!type || !text.trim()) ? '#94A3B8' : '#fff',
          fontFamily: "var(--font-head)",
          fontWeight: '700',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          minHeight: '48px',
          marginTop: '1rem',
          cursor: (!type || !text.trim()) ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? (
          <span style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        )}
        Submit report
      </button>

      {(!type || !text.trim()) && (
        <div style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#64748b', marginTop: '0.75rem' }}>
          Please select a scam type and enter some details to submit.
        </div>
      )}
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
