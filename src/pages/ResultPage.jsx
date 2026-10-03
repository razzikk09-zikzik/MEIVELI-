import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ResultPage() {
  const location = useLocation();
  const text = location.state?.text || '';
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!text) return;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(data => setResult(data))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [text]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '390px', margin: '0 auto', overflowX: 'hidden' }}>
      <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', marginBottom: '16px' }}>
        {error ? 'Service Unavailable' : 'Checking your message...'}
      </h1>
      {error ? (
        <div style={{ color: '#DC2626', marginBottom: '24px', padding: '16px', background: '#FEE2E2', borderRadius: '8px' }}>
          Could not reach the analysis servers. Please check your connection and try again later.
        </div>
      ) : (
        <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', marginBottom: '24px', wordBreak: 'break-word' }}>
          {result ? 'Analysis complete.' : text}
        </p>
      )}
      <Link to="/" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
