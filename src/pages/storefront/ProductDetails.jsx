import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

const ProductDetails = () => {
  const { slug, id } = useParams();
  const { business } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        if (business) {
          const { data: prod } = await supabase.from('products').select('*, categories(*)').eq('id', id).single();
          setProduct(prod);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug, id]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [loading, product]);

  if (loading) return (
    <div className="boutique-page-wrapper" style={{ paddingTop: '160px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div className="shimmer-effect" style={{ aspectRatio: '0.85', borderRadius: '12px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="shimmer-effect" style={{ width: '40%', height: '20px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '80%', height: '50px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '30%', height: '30px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '100%', height: '100px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '50%', height: '60px', borderRadius: '4px', marginTop: '40px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
  if (!product || !business) return <div className="boutique-page-wrapper" style={{ textAlign: 'center' }}><h1>Product not found</h1><Link to={`/${slug}`}>Return to store</Link></div>;

  return (
    <div className="boutique-page-wrapper">
      <div className="container">
        <div className="details-grid">
          {/* Image Side */}
          <div className="details-image-box reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {product.is_bestseller && (
              <div className="onsko-badge" style={{ top: '20px', left: '20px' }}>best seller</div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>

          {/* Info Side */}
          <div className="details-info">
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '10px' }}>
                {product.categories?.name || 'new arrival'}
              </span>
              <h1 style={{ marginBottom: '0.5rem', fontWeight: '800' }}>{product.name.toLowerCase()}</h1>
              <p className="details-price" style={{ marginBottom: '2.5rem' }}>${Number(product.price).toFixed(2)}</p>
              
              <div style={{ width: '40px', height: '2px', background: '#1a1a1a', marginBottom: '2.5rem' }}></div>
              
              <p className="details-desc" style={{ marginBottom: '3rem', opacity: 0.8 }}>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.4s', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'lowercase', display: 'block', marginBottom: '1rem' }}>quantity</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #dcdbd5', borderRadius: '4px', padding: '5px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: '50px', textAlign: 'center', fontSize: '1rem', fontWeight: '600' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.5s' }}>
              <button
                onClick={() => addToCart(product, quantity)}
                className="boutique-btn"
                style={{ height: '64px', borderRadius: '4px', fontSize: '1.1rem' }}
              >
                add to bag — ${(Number(product.price) * quantity).toFixed(2)}
              </button>
            </div>

            {/* Accordions */}
            <div className="reveal-on-scroll" style={{ marginTop: '4rem', transitionDelay: '0.6s' }}>
              {[
                { title: 'shipping information', content: 'We offer free carbon-neutral shipping on all orders over $150. Standard delivery typically takes 3-5 business days.' },
                { title: 'care instructions', content: 'Handle with care. Avoid direct sunlight for prolonged periods. Wipe with a dry, soft microfiber cloth for cleaning.' },
                { title: 'boutique guarantee', content: 'Every piece in our collection is curated for quality and authenticity. We guarantee the premium craftsmanship of all products.' }
              ].map((item, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #dcdbd5', padding: '20px 0' }}>
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span style={{ fontWeight: '700', textTransform: 'lowercase', fontSize: '0.95rem' }}>{item.title}</span>
                    {activeAccordion === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  {activeAccordion === idx && (
                    <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
