'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';


export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white', marginTop: 100, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Newsletter */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '40%', height: '200%', background: 'white', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', transform: 'rotate(-20deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--dark)', marginBottom: 12, fontWeight: 700 }}>Join the Savaria Club</h3>
          <p style={{ color: 'var(--dark)', opacity: 0.9, marginBottom: 32, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 32px' }}>Be the first to receive exclusive offers, early access to new collections, and fashion insights.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 12, maxWidth: 540, margin: '0 auto', background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 100, backdropFilter: 'blur(10px)' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '16px 28px', borderRadius: 100, border: 'none', outline: 'none', fontSize: '1rem', background: 'white', color: 'var(--dark)' }} />
            <button type="submit" className="hover-glow" style={{ background: 'var(--dark)', color: 'white', border: 'none', padding: '16px 36px', borderRadius: 100, cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '80px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div className="animate-fadeIn">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: 20, fontWeight: 700 }}>
              <span style={{ color: 'white' }}>Savaria</span>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic', marginLeft: 4 }}>Fashion</span>
            </div>
            <p style={{ color: '#a0aec0', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 32 }}>
              Redefining contemporary style with premium quality clothing crafted for the modern soul. Elegance in every stitch.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="hover-glow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a0aec0', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.transform = 'rotate(10deg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a0aec0'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {[
            { title: 'Collections', links: [{ label: "Women's Store", href: '/products?category=women' }, { label: "Men's Shop", href: '/products?category=men' }, { label: "Kids Collection", href: '/products?category=kids' }, { label: "Ethic Heritage", href: '/products?category=ethnic-wear' }, { label: "Latest Arrivals", href: '/products?newArrival=true' }] },
            { title: 'Customer Care', links: [{ label: "Track Your Order", href: '/dashboard/orders' }, { label: "Shipping Policy", href: '#' }, { label: "Return & Exchange", href: '#' }, { label: "Size Assistance", href: '#' }, { label: "Contact Support", href: '#' }] },
            { title: 'Explore Savaria', links: [{ label: "About Our Story", href: '#' }, { label: "Sustainability", href: '#' }, { label: "Store Locator", href: '#' }, { label: "Careers", href: '#' }, { label: "Press & Media", href: '#' }] },
          ].map(({ title, links }) => (
            <div key={title} className="animate-fadeIn">
              <h4 style={{ fontWeight: 700, marginBottom: 28, color: 'white', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} style={{ color: '#a0aec0', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.3s ease', display: 'inline-block' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#a0aec0'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ color: '#718096', fontSize: '0.9rem' }}>© 2026 Savaria Fashion.</p>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.5 }} />
            <p style={{ color: '#718096', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.8 }}>Handcrafted with ❤️ for the modern soul.</p>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Privacy & Terms', 'Cookie Settings', 'Accessibility'].map(t => (
              <a key={t} href="#" style={{ color: '#718096', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#718096'}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
