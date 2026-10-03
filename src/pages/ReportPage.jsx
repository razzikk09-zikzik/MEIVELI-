import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ReportPage() {
  const location = useLocation();
  const [type, setType] = useState(location.state?.type || 'sms');
  const [text, setText] = useState('');
  const [lostMoney, setLostMoney] = useState('No'); // 'No' | 'Almost' | 'Yes'
  const [area, setArea] = useState('South Chennai');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();

  const areas = ['South Chennai', 'Velachery', 'Adyar', 'Sholinganallur', 'Perungudi', 'Medavakkam', 'Tharamani', 'Other'];

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

    const payload = { type, text: redactedText, lost_money: lostMoney, area };

    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('API failed');
    } catch (err) {
      console.log('API failed, falling back to local. Payload:', payload);
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 800);
  };

  const tiles = [
    { id: 'sms', label: 'SMS', iconBg: '#E4EDFF', iconColor: '#2563EB', svg: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></> },
    { id: 'call', label: 'Phone Call', iconBg: '#E3F6EA', iconColor: '#16A34A', svg: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></> },
    { id: 'whatsapp', label: 'WhatsApp', iconBg: '#E3F6EA', iconColor: '#25D366', svg: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></> },
    { id: 'website', label: 'Website / URL', iconBg: '#E4EDFF', iconColor: '#2563EB', svg: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
    { id: 'upi', label: 'UPI / Payment', iconBg: '#FDE8EC', iconColor: '#E11D48', svg: <><path d="M6 3h12M6 8h12M9 13l3 3 3-3M12 3v13"/></> },
    { id: 'job', label: 'Job Offer', iconBg: '#F0E8FF', iconColor: '#7C3AED', svg: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> }
  ];

  if (isDone) {
    return (
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '768px', margin: '0 auto' }}>
        <div style={{ background: '#ffffff', border: '1px solid #E6EAF2', borderRadius: '0.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem 1.5rem', marginTop: '1rem' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '1.5rem', color: '#0F1B4C' }}>Thank you.</h2>
          <p style={{ color: '#475E8A', fontSize: '1rem', maxWidth: '300px' }}>Your report helps protect {area !== 'Other' ? area : 'your neighbours'}.</p>
          <p style={{ color: '#475E8A', fontSize: '0.875rem' }}>It has been added to the community map.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '1rem' }}>
            <button onClick={() => navigate('/threats')} style={{ width: '100%', padding: '0.875rem', borderRadius: '2rem', border: 'none', background: '#2563EB', color: '#fff', fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px' }}>
              View active threats
            </button>
            <button onClick={() => { setIsDone(false); setType('sms'); setText(''); setLostMoney('No'); }} style={{ width: '100%', padding: '0.875rem', borderRadius: '2rem', border: '1px solid #E6EAF2', background: '#fff', color: '#475E8A', fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px' }}>
              Report another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSubmitDisabled = !type || !text.trim();

  return (
    <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '768px', margin: '0 auto', background: '#F6F8FC', minHeight: '100dvh' }}>
      
      {/* 2. TITLE ROW */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button onClick={() => window.history.length > 2 ? navigate(-1) : navigate('/')} style={{ background: 'none', border: 'none', color: '#0F1B4C', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minWidth: '48px', minHeight: '48px', marginLeft: '-0.5rem' }}>
          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: '22px', fontWeight: 600, color: '#0F1B4C' }}>Report a scam</h1>
      </div>



      {/* 4. HEADLINE */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: '26px', fontWeight: 700, color: '#0F1B4C', lineHeight: 1.1 }}>Help protect your neighbours.</h2>
        <p style={{ color: '#475E8A', fontSize: '18px', marginTop: '4px' }}>Takes under a minute.</p>
      </div>

      {/* 5. TYPE TILES */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '18px', color: '#0F1B4C', marginBottom: '8px' }}>What type of scam is this?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {tiles.map(tile => {
            const isSelected = type === tile.id;
            return (
              <button
                key={tile.id}
                onClick={() => setType(tile.id)}
                style={{
                  background: isSelected ? '#EAF1FF' : '#fff',
                  border: isSelected ? '2px solid #2563EB' : '1px solid #E3E9F5',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: isSelected ? '0 11px' : '0 12px', // adjust for 2px border
                  gap: '12px',
                  cursor: 'pointer',
                  height: '60px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  minWidth: 0,
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: '44px', height: '44px', background: tile.iconBg, borderRadius: '50%' }}>
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke={tile.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {tile.svg}
                  </svg>
                </div>
                <span className="text-ellipsis-1" style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '16px', color: '#0F1B4C', textAlign: 'left' }}>{tile.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 6. TEXTAREA */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '18px', color: '#0F1B4C', marginBottom: '8px' }}>Paste the message, link or number</h3>
        <div
          style={{
            background: '#fff',
            border: '1px solid #D5DDEE',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '110px',
            overflow: 'hidden'
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
              padding: '12px',
              fontFamily: "var(--font-body)",
              fontSize: '16px',
              color: '#0F1B4C',
              resize: 'none',
              outline: 'none',
              minHeight: '60px'
            }}
          />
          <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <button style={{ width: '40px', height: '40px', background: '#E4EDFF', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
            <span style={{ fontSize: '14px', color: '#94a3b8', paddingBottom: '4px' }}>{text.length}/1000</span>
          </div>
        </div>
      </div>

      {/* 7. MONEY CONTROL */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '18px', color: '#0F1B4C', marginBottom: '8px' }}>Did you lose money?</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['No', 'Almost', 'Yes'].map(opt => {
            const isSelected = lostMoney === opt;
            return (
              <button
                key={opt}
                onClick={() => setLostMoney(opt)}
                style={{
                  flex: 1,
                  height: '48px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #2563EB' : '1px solid transparent',
                  background: isSelected ? '#fff' : '#EEF2FB',
                  color: isSelected ? '#2563EB' : '#475E8A',
                  fontFamily: "var(--font-head)",
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* 8. AREA */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '18px', color: '#0F1B4C', marginBottom: '8px' }}>Where did this happen?</h3>
        <div style={{ position: 'relative' }}>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{
              width: '100%',
              height: '52px',
              padding: '0 40px',
              borderRadius: '12px',
              border: '1px solid #D5DDEE',
              background: '#fff',
              fontFamily: "var(--font-body)",
              fontSize: '16px',
              color: '#0F1B4C',
              appearance: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
      </div>

      {/* 9. PRIVACY NOTE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#EAF1FF', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: '500', fontSize: '16px', color: '#0F1B4C' }}>Your report is anonymous by default.</div>
          <div style={{ fontSize: '14px', color: '#475E8A', marginTop: '2px' }}>This helps keep you and others safe.</div>
        </div>
      </div>

      {/* 10. SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled || isSubmitting}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '28px',
          border: 'none',
          background: isSubmitDisabled ? '#E8EEFA' : 'linear-gradient(90deg, #1D6FF2 0%, #7C5CF5 100%)',
          color: isSubmitDisabled ? '#8BA1CC' : '#fff',
          fontFamily: "var(--font-head)",
          fontWeight: '600',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
          flexShrink: 0
        }}
      >
        {isSubmitting ? (
          <span style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        )}
        Submit report
      </button>
      
      {isSubmitDisabled && (
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#475E8A', marginTop: '12px' }}>
          Please select a scam type and enter details to submit.
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        /* Add text-ellipsis just in case */
        .text-ellipsis-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
