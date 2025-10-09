export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 40 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(1, minmax(0,1fr))',
        }}
      >
        <div style={{ color: 'var(--foreground)' }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Techvio</div>
          <div style={{ opacity: 0.7 }}>
            IT solutions and business services to scale your growth.
          </div>
        </div>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Company</div>
            <div>About</div>
            <div>Careers</div>
            <div>Contact</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Resources</div>
            <div>Blog</div>
            <div>Docs</div>
            <div>Support</div>
          </div>
        </div>
        <div style={{ opacity: 0.6, fontSize: 13 }}>
          © {new Date().getFullYear()} Techvio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
