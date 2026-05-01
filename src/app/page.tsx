'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck, Shield, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { productsAPI, categoriesAPI, bannersAPI } from '@/lib/api';

const HERO_SLIDES = [
  { title: 'New Season Arrivals', subtitle: 'Discover the finest fashion crafted for modern elegance', cta: 'Shop Now', ctaLink: '/products?newArrival=true', badge: 'NEW COLLECTION 2026', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)', img: '/hero-2026.png' },
  { title: 'Season Sale', subtitle: 'Up to 50% off on premium clothing & accessories', cta: 'Shop Sale', ctaLink: '/products?sort=price_asc', badge: 'UP TO 50% OFF', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)', img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format' },
  { title: 'Ethnic Elegance', subtitle: 'Celebrate tradition with contemporary ethnic wear collections', cta: 'Explore', ctaLink: '/products?category=ethnic-wear', badge: 'FESTIVAL SPECIAL', color: '#1a1a2e', accent: '#c9a84c', bg: 'linear-gradient(135deg, #4a0e0e 0%, #8b1a1a 100%)', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format' },
];

const CATEGORIES = [
  { name: "Women's Fashion", slug: 'women', subtitle: 'Modern Elegance', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format' },
  { name: "Men's Style", slug: 'men', subtitle: 'Classic & Sharp', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format' },
  { name: 'Kids Wear', slug: 'kids', subtitle: 'Playful Trends', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf0?w=600&auto=format' },
  { name: 'Ethnic Wear', slug: 'ethnic-wear', subtitle: 'Heritage Fusion', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format' },
  { name: 'Accessories', slug: 'accessories', subtitle: 'The Final Touch', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format' },
  { name: 'Western Wear', slug: 'western-wear', subtitle: 'Urban Essentials', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format' },
];

const FEATURES = [
  { icon: <Truck size={28} />, title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: <Shield size={28} />, title: '100% Authentic', desc: 'Guaranteed genuine products' },
  { icon: <RefreshCw size={28} />, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: <Tag size={28} />, title: 'Best Prices', desc: 'Lowest price guaranteed' },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = useCallback(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), []);
  const prevSlide = useCallback(() => setHeroIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    Promise.all([
      productsAPI.getAll({ featured: 'true', limit: 8 }),
      productsAPI.getAll({ newArrival: 'true', limit: 8 }),
    ]).then(([feat, newArr]) => {
      setProducts(feat.data.products || []);
      setNewArrivals(newArr.data.products || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section style={{ position: 'relative', height: 'clamp(500px, 85vh, 800px)', background: slide.bg, overflow: 'hidden', transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {/* Animated Background Blobs */}
          <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: '45%', height: '70%', background: 'var(--gold)', filter: 'blur(160px)', opacity: 0.12, borderRadius: '50%', animation: 'softFloat 12s infinite ease-in-out' }} />
          <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '35%', height: '60%', background: '#4a3aff', filter: 'blur(160px)', opacity: 0.08, borderRadius: '50%', animation: 'softFloat 15s infinite ease-in-out reverse' }} />

          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center', maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ zIndex: 2, color: 'white' }} key={heroIdx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }} className="animate-scaleIn">
                <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
                <span style={{ color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>{slide.badge}</span>
              </div>
              <h1 className="animate-scaleIn" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: 28, color: 'white' }}>
                {slide.title}
              </h1>
              <p className="animate-fadeIn" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: 44, maxWidth: 520, lineHeight: 1.9, animationDelay: '0.2s' }}>
                {slide.subtitle}
              </p>
              <div className="animate-fadeIn" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animationDelay: '0.4s' }}>
                <Link href={slide.ctaLink} style={{ textDecoration: 'none' }}>
                  <button className="btn-gold hover-glow" style={{ padding: '18px 48px', fontSize: '1.1rem', borderRadius: '4px' }}>{slide.cta}</button>
                </Link>
                <Link href="/products" style={{ textDecoration: 'none' }}>
                  <button className="hover-glow" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '18px 48px', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', backdropFilter: 'blur(8px)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}>
                    Explore More
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', perspective: '1200px' }} className="hidden-mobile">
              <div className="animate-scaleIn" style={{ position: 'relative', width: '90%', height: '80%' }}>
                <img src={slide.img} alt={slide.title} onError={e => { e.currentTarget.style.display = 'none'; }} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', opacity: 0.95, boxShadow: '30px 30px 60px rgba(0,0,0,0.4)', transform: 'rotateY(-8deg) rotateX(2deg)', transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)' }} 
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(-8deg) rotateX(2deg) scale(1)'}
                />
                <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderLeft: '2px solid var(--gold)', borderBottom: '2px solid var(--gold)', zIndex: -1 }} />
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 40, left: '24px', display: 'flex', gap: 16, zIndex: 3 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{ width: i === heroIdx ? 40 : 12, height: 2, background: i === heroIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0 }} />
            ))}
          </div>
        </section>

        {/* Features Strip */}
        <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
            {FEATURES.map(({ icon, title, desc }, i) => (
              <div key={title} className="animate-fadeIn" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, animationDelay: `${i * 0.15}s` }}>
                <span className="animate-softFloat" style={{ color: 'var(--gold)', background: 'var(--beige)', padding: 14, borderRadius: '4px' }}>{icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, letterSpacing: '0.5px' }}>{title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Designer Quote (Human Touch) */}
        <section style={{ background: 'var(--cream)', padding: '100px 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <span style={{ fontSize: '3.5rem', color: 'var(--gold)', fontFamily: 'serif', opacity: 0.3, display: 'block', marginBottom: -20 }}>"</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontStyle: 'italic', color: 'var(--dark)', lineHeight: 1.6, marginBottom: 32 }}>
              True fashion is not about what you wear, but the story you tell through your elegance. Every piece in our collection is a chapter of that story.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Aria Savaria, Founder</p>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="section" style={{ background: '#ffffff', padding: '100px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: 12 }}>Shop by Category</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}>Find your perfect style across our curated collections</p>
            </div>
            
            <div className="category-grid" style={{ 
              display: 'grid', 
              gap: '24px',
              gridTemplateColumns: 'repeat(var(--grid-cols, 6), 1fr)' 
            }}>
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="category-card" style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                      <img 
                        src={cat.img} 
                        alt={cat.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease' 
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{cat.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>{cat.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <span style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: 'var(--gold)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8,
                  paddingBottom: '4px',
                  borderBottom: '2px solid rgba(201,168,76,0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.3)'}
                >
                  View All Categories &nbsp; →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="section" style={{ background: 'white', padding: '100px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Top Picks</span>
                <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Featured Products</h2>
              </div>
              <Link href="/products?featured=true" style={{ textDecoration: 'none' }}>
                <button className="btn-outline hover-glow" style={{ padding: '12px 32px' }}>View All Collections</button>
              </Link>
            </div>
            {loading ? (
              <div className="products-grid">{[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 20 }} />)}</div>
            ) : products.length > 0 ? (
              <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--cream)', borderRadius: 32, border: '1px dashed var(--border)' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 24 }}>Discover our hand-picked featured collection soon.</p>
                <Link href="/admin"><button className="btn-gold">Add Featured Products</button></Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ position: 'relative', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '120px 0', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', height: '80%', background: 'var(--gold)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '30%', height: '60%', background: '#4a3aff', filter: 'blur(100px)', opacity: 0.08, borderRadius: '50%' }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', padding: '8px 24px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '3px', marginBottom: 28, textTransform: 'uppercase' }}>
              <Sparkles size={14} /> Season Finale
            </span>
            <h2 className="animate-fadeIn" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: 20, lineHeight: 1.2 }}>Up to 50% Off on Ethnic Collection</h2>
            <p className="animate-fadeIn" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.8 }}>Embrace the elegance of tradition with our exclusive festive range. Limited units available at these prices.</p>
            <Link href="/products" className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <button className="btn-gold hover-glow" style={{ padding: '18px 48px', fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>Shop Now</button>
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="section" style={{ padding: '100px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Just Landed</span>
                <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>New Arrivals</h2>
              </div>
              <Link href="/products?newArrival=true" style={{ textDecoration: 'none' }}>
                <button className="btn-outline hover-glow" style={{ padding: '12px 32px' }}>Explore Latest</button>
              </Link>
            </div>
            {loading ? (
              <div className="products-grid">{[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 20 }} />)}</div>
            ) : newArrivals.length > 0 ? (
              <div className="products-grid">{newArrivals.map(p => <ProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                <p>New arrivals will appear here. Add products via Admin Panel.</p>
              </div>
            )}
          </div>
        </section>

        {/* Floating Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-glow"
          style={{ 
            position: 'fixed', 
            bottom: 40, 
            right: 40, 
            width: 54, 
            height: 54, 
            borderRadius: '4px', 
            background: 'var(--dark)', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            zIndex: 100, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            opacity: showBackToTop ? 1 : 0,
            pointerEvents: showBackToTop ? 'auto' : 'none',
            transform: showBackToTop ? 'scale(1)' : 'scale(0.5)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
        >
          <ChevronRight size={26} style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </main>
      <Footer />
    </>
  );
}
