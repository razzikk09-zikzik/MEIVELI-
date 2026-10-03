// src/components/Sidebar.jsx
// Uses SVG icons directly

const NAV = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    active: true,
    // filled house
    svg: (
      <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
  },
  {
    id: 'report',
    label: 'Report a Scam',
    href: '/report',
    active: false,
    svg: (
      <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#DC2626">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z"/>
      </svg>
    ),
  },
  {
    id: 'threats',
    label: 'Active Threats',
    href: '/threats',
    active: false,
    svg: (
      <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#D97706">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
    ),
  },
  {
    id: 'guide',
    label: 'Safety Guide',
    href: '/guide',
    active: false,
    svg: (
      <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#16A34A">
        <path d="M21 4H3v16h18V4zm-10 14H5V6h6v12zm8 0h-6V6h6v12z"/>
      </svg>
    ),
  },
  {
    id: 'help',
    label: 'Help & Resources',
    href: '/help',
    active: false,
    svg: (
      <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="#2563EB">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
      </svg>
    ),
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{
        background: '#F3F6FF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* ── Logo header (matches topbar height 7.5rem) ── */}
      <div
        style={{
          height: '7.5rem',
          padding: '0 0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid #E8EDF5',
          gap: '0.5rem',
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <img
            src="/assets/logo.png"
            alt="MEYVIZHI"
            className="sidebar-text"
            style={{
              height: '3.5rem',
              width: 'auto',
              maxWidth: '11.875rem',
              objectFit: 'contain',
              objectPosition: 'left center',
              mixBlendMode: 'multiply',
              display: 'block',
              flexShrink: 0,
            }}
          />
        )}
        {collapsed && (
          <img
            src="/assets/logo.png"
            alt="MEYVIZHI"
            style={{ height: '1.875rem', width: '1.875rem', objectFit: 'cover', mixBlendMode: 'multiply', objectPosition: 'left' }}
          />
        )}
        <button
          onClick={onToggle}
          style={{
            width: '1.625rem',
            height: '1.625rem',
            borderRadius: '50%',
            border: '1px solid #E2E8F0',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: '700',
            lineHeight: 1,
            transition: 'background 0.15s',
          }}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '0.75rem 0.625rem', display: 'flex', flexDirection: 'column', gap: '0.1875rem' }}>
        {NAV.map((item) => (
          <a
            key={item.id}
            href={item.href}
            id={`nav-${item.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6875rem',
              padding: collapsed ? '0.625rem 0' : '0.5625rem 0.75rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              background: item.active ? 'linear-gradient(to right, #1D6FF2, #4F7BF7)' : 'transparent',
              color: item.active ? '#ffffff' : '#475569',
              justifyContent: collapsed ? 'center' : 'flex-start',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { if (!item.active) e.currentTarget.style.background = '#E0E7FF'; }}
            onMouseLeave={(e) => { if (!item.active) e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.svg}</span>
            {!collapsed && (
              <span
                className="sidebar-text"
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: item.active ? '700' : '500',
                  fontSize: '0.84375rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div
        style={{
          padding: '0.75rem 0.875rem',
          borderTop: '1px solid #E8EDF5',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4375rem',
          flexShrink: 0,
        }}
      >
        <div style={{ background: '#E0E7FF', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="#fff">
              <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
            </svg>
          </div>
          {!collapsed && (
            <div className="sidebar-text">
              <div style={{ fontFamily: "var(--font-head)", fontWeight: '600', fontSize: '0.75rem', color: '#1E3A8A' }}>
                South Chennai
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: '0.65625rem', color: '#3B82F6' }}>
                Community-powered
              </div>
            </div>
          )}
        </div>
        
        {/* Status dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: collapsed ? 'center' : 'flex-start', marginTop: '0.25rem' }}>
          <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#16A34A', flexShrink: 0, display: 'block' }} />
          {!collapsed && (
            <span className="sidebar-text" style={{ fontFamily: "var(--font-head)", fontWeight: '700', fontSize: '0.6875rem', color: '#16A34A', letterSpacing: '0.025rem' }}>
              SYSTEM OPERATIONAL
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
