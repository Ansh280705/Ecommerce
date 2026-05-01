'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const categories = [
  { name: 'Women', slug: 'women' },
  { name: 'Men', slug: 'men' },
  { name: 'Kids', slug: 'kids' },
  { name: 'Ethnic Wear', slug: 'ethnic-wear' },
  { name: 'Western Wear', slug: 'western-wear' },
  { name: 'Accessories', slug: 'accessories' },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { totalItems } = useCartStore();
  const { user, clearUser } = useAuthStore();
  const { ids: wishlistIds } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch {}
    clearUser();
    toast.success('Logged out successfully');
    router.push('/');
    setUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '3px',
        background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
        width: scrolled ? '100%' : '0%',
        zIndex: 1001, transition: 'width 0.2s ease-out',
        display: scrolled ? 'block' : 'none'
      }} />

      {/* Top Bar */}
      <div style={{ background: 'var(--dark)', color: 'white', padding: '10px 0', fontSize: '0.78rem', textAlign: 'center', letterSpacing: '0.5px' }}>
        <span style={{ color: 'var(--gold)' }}>✨</span> <span style={{ opacity: 0.9 }}>Free shipping on orders above ₹999 &nbsp;|&nbsp; Use code</span> <strong className="text-shimmer" style={{ fontWeight: 800 }}>SAVARIA10</strong> <span style={{ opacity: 0.9 }}>for 10% off</span>
      </div>

      {/* Main Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'white',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid var(--border)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? 64 : 85, transition: 'height 0.5s ease' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} 
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) rotate(-1deg)'} 
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.5px' }}>Savaria</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 400, color: 'var(--gold)', fontStyle: 'italic', marginLeft: '-2px' }}>Fashion</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="hover-glow animate-scaleIn"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '0.94rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover-glow" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: 'var(--text-primary)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--beige)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="hover-glow" style={{ textDecoration: 'none', padding: 8, borderRadius: 8, color: 'var(--text-primary)', position: 'relative', display: 'flex', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--beige)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
              <Heart size={20} />
              {mounted && wishlistIds.length > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--red)', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="hover-glow" style={{ textDecoration: 'none', padding: 8, borderRadius: 8, color: 'var(--text-primary)', position: 'relative', display: 'flex', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--beige)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
              <ShoppingBag size={20} />
              {mounted && totalItems() > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--gold)', color: 'var(--dark)', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '2px solid var(--border)', borderRadius: 50, padding: '6px 14px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="hidden-mobile">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {userMenuOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'white', borderRadius: 16, border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', minWidth: 200, overflow: 'hidden', zIndex: 100 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--beige)' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</p>
                    </div>
                    {[
                      { href: '/dashboard', icon: <LayoutDashboard size={16} />, label: 'My Dashboard' },
                      { href: '/dashboard/orders', icon: <Package size={16} />, label: 'My Orders' },
                      { href: '/wishlist', icon: <Heart size={16} />, label: 'Wishlist' },
                      ...(user.role === 'ADMIN' ? [{ href: '/admin', icon: <LayoutDashboard size={16} />, label: 'Admin Panel' }] : []),
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--beige)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                        <span style={{ color: 'var(--gold)' }}>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--red)', fontSize: '0.9rem', borderTop: '1px solid var(--border)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Login</button>
              </Link>
            )}

            {/* Mobile Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }} className="show-mobile">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '12px 0', background: 'var(--beige)' }}>
            <div className="container">
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
                <input ref={searchRef} className="input-field" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for dresses, shirts, kurtas..." style={{ flex: 1 }} />
                <button type="submit" className="btn-gold" style={{ padding: '12px 24px' }}>Search</button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'white', padding: '16px 0' }}>
            <div className="container">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
