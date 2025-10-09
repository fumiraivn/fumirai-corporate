import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: '#ffffff',
        borderBottom: '1px solid rgba(2,6,23,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: '#0b5ed7' }}>
          Techvio
        </Link>
        <nav style={{ display: 'flex', gap: 18, color: '#0f172a' }}>
          <Link href="#services">Services</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
