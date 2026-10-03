// src/components/ScamMap.jsx
import React from 'react';

const hotspots = [
  { id: 'h1', name: 'Velachery', reports: 14, left: '45%', top: '52%', risk: 'high', align: 'left' },
  { id: 'h2', name: 'Sholinganallur', reports: 3, left: '62%', top: '82%', risk: 'high', align: 'left' },
  { id: 'h3', name: 'Adyar', reports: 3, left: '66%', top: '22%', risk: 'medium', align: 'left' },
  { id: 'h4', name: 'Perungudi', reports: 0, left: '58%', top: '62%', risk: 'medium' },
  { id: 'h5', name: 'Medavakkam', reports: 0, left: '28%', top: '74%', risk: 'medium' },
  { id: 'h6', name: 'Tharamani', reports: 0, left: '50%', top: '36%', risk: 'low' }
];

export default function ScamMap() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '0.625rem', overflow: 'hidden', background: '#e5e7eb', border: '1px solid #DBEAFE' }}>
      
      {/* ── Static SVG Map Placeholder ── */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <rect width="800" height="600" fill="#E8F4F8" /> {/* Sea */}
        <path d="M0,0 L650,0 C630,100 660,250 630,350 C600,450 640,550 600,600 L0,600 Z" fill="#F0F4E8" /> {/* Land */}
        {/* Faint road lines */}
        <path d="M100,0 L200,600 M300,0 L250,600 M0,200 L600,300 M0,400 L600,500" stroke="#E2E8F0" strokeWidth="2" fill="none" />
      </svg>
      
      {/* ── Hotspot Markers ── */}
      {hotspots.map((spot) => {
        let size = 44;
        let colorMap = {
          high: { rgb: '220, 38, 38', hex: '#DC2626' },
          medium: { rgb: '234, 88, 12', hex: '#EA580C' },
          low: { rgb: '234, 179, 8', hex: '#EAB308' }
        };
        
        if (spot.risk === 'high') size = 56;
        if (spot.risk === 'low') size = 34;

        const baseColor = colorMap[spot.risk] || colorMap.medium;

        return (
          <div key={spot.id} style={{ position: 'absolute', left: spot.left, top: spot.top, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
            <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '12px', height: '12px', borderRadius: '50%', background: baseColor.hex, transform: 'translate(-50%,-50%)', boxShadow: `0 0 4px rgba(${baseColor.rgb}, 0.5)`, zIndex: 2, animation: 'pulse-dot 2s infinite' }}></div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: `radial-gradient(circle, rgba(${baseColor.rgb}, 0.4) 0%, transparent 70%)`, transform: 'translate(-50%,-50%)', zIndex: 1, animation: 'pulse-ring 2s infinite' }}></div>
            </div>
            
            {/* Label Cards */}
            {spot.align && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: spot.align === 'left' ? 'auto' : `calc(${size / 2}px + 4px)`,
                  right: spot.align === 'left' ? `calc(${size / 2}px + 4px)` : 'auto',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 0.125rem 0.5rem rgba(0,0,0,0.08)',
                  borderRadius: '0.375rem',
                  padding: '0.25rem 0.5rem',
                  textAlign: 'center',
                  zIndex: 20,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '0.75rem', color: '#1e293b' }}>
                  {spot.name}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', color: '#DC2626', marginTop: '0.0625rem', fontWeight: '600' }}>
                  {spot.reports} reports
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Overlays ── */}
      <button
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 400,
          background: 'rgba(255,255,255,0.95)',
          padding: '0.375rem 0.75rem',
          borderRadius: '1.25rem',
          border: '1px solid #E8EDF5',
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.05)',
          fontFamily: 'var(--font-head)',
          fontWeight: '600',
          fontSize: '0.6875rem',
          color: '#1e293b',
          cursor: 'pointer',
        }}
      >
        View all threats →
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: '0.5rem',
          left: '0.5rem',
          zIndex: 400,
          background: 'rgba(255,255,255,0.95)',
          padding: '0.375rem 0.75rem',
          borderRadius: '1.25rem',
          display: 'flex',
          gap: '0.75rem',
          border: '1px solid #E8EDF5',
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#DC2626' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#334155', fontWeight: '500' }}>High activity</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#EA580C' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#334155', fontWeight: '500' }}>Medium activity</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', background: '#CA8A04' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#334155', fontWeight: '500' }}>Low activity</span>
        </div>
      </div>
    </div>
  );
}
