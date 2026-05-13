import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

const ProductDetails = () => {
  const { slug, id } = useParams();
  const { businessId, storeData } = useStore();
  const business = storeData;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedCount, setAddedCount] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!businessId) return;
      try {
        setLoading(true);
        const { data: prod } = await supabase.from('products').select('*, categories(*)').eq('id', id).single();
        setProduct(prod);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [businessId, id]);

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
    <div className="boutique-page-wrapper product-page-refresh">
      <div className="container">
        <div className="details-grid-new">
          {/* Image Side */}
          <div className="details-image-box-new reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {product.is_bestseller && (
              <div className="onsko-badge" style={{ top: '30px', left: '30px' }}>best seller</div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="luxury-detail-img"
            />
          </div>

          {/* Info Side */}
          <div className="details-info-new">
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <div className="magazine-category-badge">
                {product.categories?.name || 'exclusive collection'}
              </div>
              <h1 className="product-title-luxury">{product.name.toLowerCase()}</h1>
              
              <div className="luxury-price-tag">
                <span className="currency">₹</span>
                <span className="amount">{Number(product.price).toFixed(0)}</span>
              </div>

              <p className="details-desc-luxury">{product.description}</p>
              
              <div className="magazine-divider" style={{ margin: '3rem 0', width: '100px' }}></div>
            </div>

            {/* Action Bar */}
            <div className="reveal-on-scroll action-bar-luxury" style={{ transitionDelay: '0.4s' }}>
              <div className="total-price-display">
                <span className="label-caps">total</span>
                <span className="total-amount">₹{(Number(product.price) * (cart.find(item => item.id === product.id)?.quantity || 1)).toFixed(0)}</span>
              </div>
              
              {cart.find(item => item.id === product.id) ? (
                <div className="luxury-button-qty-selector">
                  <button 
                    onClick={() => {
                      const item = cart.find(i => i.id === product.id);
                      if (item.quantity === 1) {
                        removeFromCart(product.id);
                      } else {
                        updateQuantity(product.id, -1);
                      }
                    }} 
                    className="btn-qty-action"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="btn-qty-current">{cart.find(i => i.id === product.id).quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, 1)} 
                    className="btn-qty-action"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product, 1)}
                  className="btn-add-to-bag"
                >
                  <span>add to bag</span>
                </button>
              )}
            </div>

            {/* Accordions */}
            <div className="reveal-on-scroll" style={{ marginTop: '4rem', transitionDelay: '0.6s' }}>
              {[
                { title: 'shipping information', content: 'We offer free carbon-neutral shipping on all orders over ₹1000. Standard delivery typically takes 3-5 business days.' },
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
