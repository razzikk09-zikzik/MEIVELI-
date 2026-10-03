// src/components/ScamMap.jsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

const hotspots = [
  { id: 'h1', name: 'Velachery', reports: 14, lat: 12.9815, lng: 80.2180, risk: 'high', direction: 'left', offset: [-15, 0] },
  { id: 'h2', name: 'Sholinganallur', reports: 3, lat: 12.9010, lng: 80.2279, risk: 'high', direction: 'left', offset: [-15, 0] },
  { id: 'h3', name: 'Adyar', reports: 3, lat: 13.0012, lng: 80.2565, risk: 'medium', direction: 'right', offset: [15, 0] },
  { id: 'h4', name: 'Perungudi', reports: 0, lat: 12.9654, lng: 80.2461, risk: 'medium', direction: 'top', offset: [0, -15], noLabel: true },
  { id: 'h5', name: 'Medavakkam', reports: 0, lat: 12.9231, lng: 80.1925, risk: 'medium', direction: 'bottom', offset: [0, 15], noLabel: true },
  { id: 'h6', name: 'Tharamani', reports: 0, lat: 12.9850, lng: 80.2425, risk: 'low', direction: 'top', offset: [0, -15], noLabel: true }
];

function createHotspotIcon(risk) {
  let size = 44;
  let colorMap = {
    high: { rgb: '220, 38, 38', hex: '#DC2626' }, // red
    medium: { rgb: '234, 88, 12', hex: '#EA580C' }, // orange
    low: { rgb: '234, 179, 8', hex: '#EAB308' } // yellow
  };
  
  if (risk === 'high') size = 56;
  if (risk === 'low') size = 34;

  const baseColor = colorMap[risk] || colorMap.medium;

  const html = `
    <div style="position:relative; width:${size}px; height:${size}px;">
      <div style="position:absolute; top:50%; left:50%; width:12px; height:12px; border-radius:50%; background:${baseColor.hex}; transform:translate(-50%,-50%); box-shadow:0 0 4px rgba(${baseColor.rgb}, 0.5); z-index:2; animation: pulse-dot 2s infinite;"></div>
      <div style="position:absolute; top:50%; left:50%; width:${size}px; height:${size}px; border-radius:50%; background:radial-gradient(circle, rgba(${baseColor.rgb}, 0.4) 0%, transparent 70%); transform:translate(-50%,-50%); z-index:1; animation: pulse-ring 2s infinite;"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
}

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    // 1. Fit bounds
    const bounds = L.latLngBounds(hotspots.map(h => [h.lat, h.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });

    // 2. Resize observer for fluid scaling
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    if (map.getContainer()) {
      resizeObserver.observe(map.getContainer());
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);
  
  return null;
}

export default function ScamMap() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '0.625rem', overflow: 'hidden', background: '#e5e7eb', border: '1px solid #DBEAFE' }}>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
      >
        <MapController />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        
        {hotspots.map((spot) => (
          <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={createHotspotIcon(spot.risk)}>
            {!spot.noLabel && (
              <Tooltip
                direction={spot.direction}
                offset={spot.offset}
                opacity={1}
                permanent
                className="custom-map-tooltip"
              >
                <div style={{ padding: '0.125rem 0.25rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: '700', fontSize: '0.75rem', color: '#1e293b' }}>
                    {spot.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.625rem', color: '#DC2626', marginTop: '0.0625rem', fontWeight: '600' }}>
                    {spot.reports} reports
                  </div>
                </div>
              </Tooltip>
            )}
          </Marker>
        ))}
      </MapContainer>
      
      {/* ── Custom Tooltip CSS ── */}
      <style>{`
        .custom-map-tooltip {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.08);
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
        }
        .custom-map-tooltip::before {
          display: none !important; /* Hide tooltip arrow */
        }
      `}</style>

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
