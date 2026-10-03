import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScamMap from '../components/ScamMap';
import { scamCards } from '../data/mock';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const campaigns = [
  { id: 1, type: 'Bank KYC', title: 'Fake SBI KYC link', desc: 'Fake bank messages asking for OTP.', area: 'Velachery', reports: 14, risk: 'high', lat: 12.9815, lng: 80.2180, time: '2 hrs ago', how: 'Scammer sends SMS claiming KYC is expired.', flags: ['Urgent tone', 'Unknown sender', 'Suspicious link'] },
  { id: 2, type: 'Courier', title: 'Courier refund SMS', desc: 'Fake delivery links asking for payment.', area: 'Adyar', reports: 6, risk: 'medium', lat: 13.0012, lng: 80.2565, time: '4 hrs ago', how: 'SMS asks for customs fee to release a package.', flags: ['Tiny fee request', 'Link not matching official site', 'No tracking number'] },
  { id: 3, type: 'Job offer', title: 'Fake job offer on WhatsApp', desc: 'Job offers asking for upfront money.', area: 'Sholinganallur', reports: 5, risk: 'high', lat: 12.9010, lng: 80.2279, time: 'Today', how: 'Promises easy work from home for high pay.', flags: ['Unsolicited WhatsApp', 'Too good to be true', 'Asks for reg fee'] },
  { id: 4, type: 'UPI', title: 'UPI collect request', desc: 'Fraudulent collect requests on UPI apps.', area: 'Perungudi', reports: 4, risk: 'medium', lat: 12.9654, lng: 80.2461, time: 'Yesterday', how: 'Sends collect request pretending to send money.', flags: ['Enter PIN to receive money', 'Unknown sender', 'Urgent call matching request'] },
  { id: 5, type: 'Fake link', title: 'Electricity bill disconnection SMS', desc: 'Threatens power cut if not paid immediately.', area: 'Medavakkam', reports: 3, risk: 'low', lat: 12.9231, lng: 80.1925, time: 'Yesterday', how: 'SMS warns power will be cut tonight.', flags: ['Mobile number sender', 'Call this personal number', 'App installation requested'] }
];

function MobileMapController({ markers, selectedId }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
    setTimeout(() => map.invalidateSize(), 200);
  }, [map, markers]);
  
  useEffect(() => {
    if (selectedId) {
      const marker = markers.find(m => m.id === selectedId);
      if (marker) {
        map.setView([marker.lat, marker.lng], 14, { animate: true });
      }
    }
  }, [map, selectedId, markers]);
  
  return null;
}

export default function ThreatsPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterType, setFilterType] = useState('All');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chips = ['All', 'Bank KYC', 'Courier', 'UPI', 'Job offer', 'Fake link'];
  const filtered = filterType === 'All' ? campaigns : campaigns.filter(c => c.type === filterType);
  
  const selectedCampaign = campaigns.find(c => c.id === selectedId);

  const getIconSvg = (type) => {
    switch(type) {
      case 'Bank KYC': return <path d="M3 21h18M3 10h18M5 6l7-3 7 3v4H5V6zM4 10l1 11h14l1-11"/>;
      case 'Courier': return <path d="M10 17h4V5H2v12h3M14 9h5l3 3v5h-3M7 17a2 2 0 100-4 2 2 0 000 4zM19 17a2 2 0 100-4 2 2 0 000 4z"/>;
      case 'UPI': return <path d="M6 3h12M6 8h12M9 13l3 3 3-3M12 3v13"/>;
      case 'Job offer': return <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16M2 7h20v14H2z"/>;
      default: return <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>; // link
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'high') return '#DC2626';
    if (risk === 'medium') return '#EA580C';
    return '#CA8A04';
  };

  const getRiskBg = (risk) => {
    if (risk === 'high') return '#FEF2F2';
    if (risk === 'medium') return '#FFF7ED';
    return '#FEFCE8';
  };

  const handleCheckSample = () => {
    if (selectedCampaign) {
      navigate('/', { state: { sampleText: selectedCampaign.title } });
    }
  };

  if (!isMobile) {
    // Desktop layout (preserved)
    return (
      <div style={{ padding: '1rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Active threats</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>What's happening in South Chennai right now.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
          <button style={{ padding: '0.375rem 0.75rem', background: '#2563EB', color: '#fff', borderRadius: '1rem', border: 'none', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Bank KYC</button>
          <button style={{ padding: '0.375rem 0.75rem', background: '#fff', color: '#475569', borderRadius: '1rem', border: '1px solid #E6EAF2', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Courier</button>
          <button style={{ padding: '0.375rem 0.75rem', background: '#fff', color: '#475569', borderRadius: '1rem', border: '1px solid #E6EAF2', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>UPI</button>
          <button style={{ padding: '0.375rem 0.75rem', background: '#fff', color: '#475569', borderRadius: '1rem', border: '1px solid #E6EAF2', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Job offer</button>
          <button style={{ padding: '0.375rem 0.75rem', background: '#fff', color: '#475569', borderRadius: '1rem', border: '1px solid #E6EAF2', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Fake link</button>
        </div>

        <div style={{ height: '38vh', position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #E6EAF2', zIndex: 0 }}>
          <ScamMap />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {scamCards.map((card) => {
            const isHigh = card.risk === 'high';
            const bgTint = isHigh ? '#FFF5F5' : '#FFFBEB';
            const iconColor = isHigh ? 'invert(16%) sepia(91%) saturate(7351%) hue-rotate(358deg) brightness(94%) contrast(114%)' : 'invert(52%) sepia(61%) saturate(3065%) hue-rotate(1deg) brightness(102%) contrast(105%)';

            return (
              <div key={card.id} style={{ border: '1px solid #E6EAF2', borderRadius: '0.5rem', background: bgTint, padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={card.iconUrl} alt="" style={{ width: '2rem', height: '2rem', filter: iconColor }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '800', fontSize: '0.9375rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '0.125rem' }}>{card.desc}</p>
                </div>
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* HEADER */}
      <div style={{ marginTop: '8px' }}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: '26px', fontWeight: 700, color: '#0F1B4C', lineHeight: 1.1 }}>Active threats</h1>
        <p style={{ color: '#475E8A', fontSize: '16px', marginTop: '4px' }}>What's happening in South Chennai right now.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }} />
          <span style={{ fontSize: '14px', color: '#475E8A' }}>Updated 5 min ago</span>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {chips.map(chip => (
            <button 
              key={chip}
              onClick={() => setFilterType(chip)}
              style={{
                height: '36px',
                padding: '0 16px',
                borderRadius: '18px',
                border: filterType === chip ? 'none' : '1px solid #E6EAF2',
                background: filterType === chip ? '#2563EB' : '#fff',
                color: filterType === chip ? '#fff' : '#475E8A',
                fontFamily: "var(--font-head)",
                fontWeight: '600',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {chip}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ height: '32px', padding: '0 12px', borderRadius: '8px', border: '1px solid #E6EAF2', background: '#fff', color: '#475E8A', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            All areas <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button style={{ height: '32px', padding: '0 12px', borderRadius: '8px', border: '1px solid #E6EAF2', background: '#fff', color: '#475E8A', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Last 7 days <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div style={{ background: '#fff', border: '1px solid #E6EAF2', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '16px', color: '#0F1B4C' }}>128 Reports this week</span>
          <span style={{ fontSize: '14px', color: '#DC2626', fontWeight: '600' }}>Velachery on alert</span>
        </div>
        <div style={{ fontSize: '14px', color: '#475E8A' }}>6 Active campaigns</div>
      </div>

      {/* MAP */}
      <div style={{ height: '30vh', minHeight: '220px', position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E6EAF2', zIndex: 0 }}>
        <MapContainer
          center={[12.95, 80.22]}
          zoom={12}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={true}
          touchZoom={true}
          style={{ height: '100%', width: '100%', background: '#F6F8FC' }}
          attributionControl={false}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" className="mobile-map-tiles" />
          
          {filtered.map(spot => {
            const size = spot.risk === 'high' ? 40 : spot.risk === 'medium' ? 30 : 25;
            const color = getRiskColor(spot.risk);
            
            const htmlIcon = L.divIcon({
              html: `<div style="position: relative; width: ${size}px; height: ${size}px;">
                <div style="position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; border-radius: 50%; background: ${color}; transform: translate(-50%,-50%); z-index: 2;"></div>
                <div style="position: absolute; top: 50%; left: 50%; width: ${size}px; height: ${size}px; border-radius: 50%; background: ${color}; opacity: 0.25; transform: translate(-50%,-50%); z-index: 1;"></div>
              </div>`,
              className: '',
              iconSize: [size, size],
              iconAnchor: [size / 2, size / 2],
              tooltipAnchor: [0, -size / 2]
            });

            return (
              <Marker 
                key={spot.id} 
                position={[spot.lat, spot.lng]} 
                icon={htmlIcon}
                eventHandlers={{ click: () => setSelectedId(spot.id) }}
              >
                {selectedId === spot.id && (
                  <Tooltip permanent direction="top" className="mobile-marker-tooltip" offset={[0, -10]}>
                    <div style={{ padding: '4px 8px', fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '13px', color: '#0F1B4C' }}>
                      {spot.area}, {spot.reports} reports
                    </div>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
          <MobileMapController markers={filtered} selectedId={selectedId} />
        </MapContainer>
        
        {/* Map Legend */}
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', zIndex: 400, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: '12px', display: 'flex', gap: '10px', border: '1px solid #E6EAF2', backdropFilter: 'blur(4px)' }}>
          {['High', 'Medium', 'Low'].map(r => (
            <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getRiskColor(r.toLowerCase()) }} />
              <span style={{ fontSize: '11px', fontWeight: '500', color: '#475E8A' }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAMPAIGN LIST */}
      <div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: '18px', fontWeight: 700, color: '#0F1B4C', marginBottom: '12px' }}>
          Active campaigns ({filtered.length})
        </h2>
        
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E6EAF2', borderRadius: '14px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ color: '#475E8A', fontSize: '16px', marginBottom: '16px' }}>No active campaigns for this filter</p>
            <button onClick={() => setFilterType('All')} style={{ background: '#EAF1FF', color: '#2563EB', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: '600', fontFamily: "var(--font-head)" }}>
              Show all
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...filtered].sort((a,b) => b.reports - a.reports).map(campaign => (
              <div 
                key={campaign.id} 
                onClick={() => setSelectedId(campaign.id)}
                style={{ 
                  background: '#fff', 
                  border: selectedId === campaign.id ? '2px solid #2563EB' : '1px solid #E6EAF2', 
                  borderRadius: '14px', 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'border 0.2s'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: getRiskBg(campaign.risk), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke={getRiskColor(campaign.risk)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {getIconSvg(campaign.type)}
                  </svg>
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '16px', color: '#0F1B4C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {campaign.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475E8A', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {campaign.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', background: '#F1F5F9', color: '#475E8A', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>{campaign.area}</span>
                    <span style={{ fontSize: '13px', color: '#0F1B4C', fontWeight: '600' }}>{campaign.reports} reports</span>
                    <span style={{ fontSize: '13px', color: '#94A3B8' }}>• {campaign.time}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', flexShrink: 0 }}>
                  <div style={{ background: getRiskBg(campaign.risk), color: getRiskColor(campaign.risk), fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {campaign.risk}
                  </div>
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM SHEET */}
      {selectedCampaign && (
        <>
          <div onClick={() => setSelectedId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,27,76,0.4)', zIndex: 900, backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', zIndex: 1000, padding: '20px', paddingBottom: 'calc(20px + 4.5rem + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ width: '40px', height: '4px', background: '#E6EAF2', borderRadius: '2px', margin: '0 auto -8px' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: '20px', fontWeight: '800', color: '#0F1B4C' }}>{selectedCampaign.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <div style={{ background: getRiskBg(selectedCampaign.risk), color: getRiskColor(selectedCampaign.risk), fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {selectedCampaign.risk} RISK
                  </div>
                  <span style={{ fontSize: '14px', color: '#475E8A' }}>{selectedCampaign.area} • {selectedCampaign.reports} reports</span>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="#0F1B4C" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-head)", fontSize: '15px', fontWeight: '700', color: '#0F1B4C', marginBottom: '4px' }}>How it works</h4>
              <p style={{ fontSize: '14px', color: '#475E8A' }}>{selectedCampaign.how}</p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-head)", fontSize: '15px', fontWeight: '700', color: '#0F1B4C', marginBottom: '8px' }}>Red flags</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedCampaign.flags.map(flag => (
                  <div key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <span style={{ fontSize: '14px', color: '#475E8A' }}>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <button onClick={handleCheckSample} style={{ height: '48px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '24px', fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                Check a message like this
              </button>
              <button onClick={() => {
                const mapType = { 'Bank KYC': 'sms', 'Courier': 'sms', 'UPI': 'upi', 'Job offer': 'job', 'Fake link': 'website' };
                navigate('/report', { state: { type: mapType[selectedCampaign.type] || 'sms' } });
              }} style={{ height: '48px', background: '#fff', color: '#2563EB', border: '2px solid #2563EB', borderRadius: '24px', fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '16px', cursor: 'pointer' }}>
                Report this scam
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .mobile-map-tiles { filter: grayscale(0.3) saturate(0.85) brightness(1.05); }
        .mobile-marker-tooltip { background: #fff; border: 1px solid #E6EAF2; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 8px; padding: 0; opacity: 1 !important; }
        .mobile-marker-tooltip::before { display: none; }
      `}</style>
    </div>
  );
}
