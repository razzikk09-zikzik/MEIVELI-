// src/pages/ResultPage.jsx
import { useLocation, Link } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();
  const text = location.state?.text || '';

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', marginBottom: '16px' }}>
        Checking your message...
      </h1>
      <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
        {text}
      </p>
      <Link to="/" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
