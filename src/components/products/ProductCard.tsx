'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  rating: number;
  numReviews: number;
  brand?: string;
  sizes?: string[];
  stock: number;
  category?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      size: product.sizes?.[0],
      quantity: 1,
      stock: product.stock,
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Login to add to wishlist'); return; }
    toggle(product.id);
    toast.success(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const placeholder = `https://placehold.co/400x500/faf8f4/c9a84c?text=${encodeURIComponent(product.name.slice(0, 10))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/products/${product.slug || product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="product-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="image-wrapper" style={{ height: 280, position: 'relative' }}>
            <img
              src={imgError ? placeholder : (product.images[0] || placeholder)}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            />
            <div className="overlay" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }} />

            {/* Badges */}
            <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {discount > 0 && <span className="badge badge-red">{discount}% OFF</span>}
              {product.stock === 0 && <span className="badge" style={{ background: '#1f2937', color: 'white' }}>Sold Out</span>}
            </div>

            {/* Actions */}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 8, opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(10px)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', zIndex: 10 }}>
              <button 
                onClick={handleWishlist} 
                type="button"
                style={{ width: 38, height: 38, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Heart size={18} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#374151'} />
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/products/${product.slug || product.id}`); }}
                type="button"
                style={{ width: 38, height: 38, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Eye size={18} color="#374151" />
              </button>
            </div>

            {/* Add to Cart */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(135deg, var(--dark), var(--dark2))', color: 'white', padding: '12px', textAlign: 'center', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              onClick={handleAddToCart}>
              <ShoppingBag size={16} /> Add to Cart
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '14px 16px' }}>
            {product.category && <p style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{product.category.name}</p>}
            <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.name}</h3>

            {/* Rating */}
            {product.numReviews > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} color={s <= Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />)}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({product.numReviews})</span>
              </div>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className="price">₹{product.price.toLocaleString()}</span>
              {product.comparePrice && <span className="price-compare">₹{product.comparePrice.toLocaleString()}</span>}
              {discount > 0 && <span className="discount-label">{discount}% off</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
