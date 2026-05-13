import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, User, Menu, X, Search, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BusinessHome = () => {
  const { slug } = useParams();
  const { businessId, storeData, config: contextConfig, loading: storeLoading } = useStore();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const business = storeData; // Compatibility map
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
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
  }, [loading, products]);

  useEffect(() => {
    const fetchData = async () => {
      if (!businessId) return;
      try {
        setLoading(true);

        // 2. Resolve Homepage Content
        let homeContent = contextConfig || null;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('preview') === 'true') {
          const previewData = localStorage.getItem(`carthive_preview_${slug}`);
          if (previewData) {
            try {
              homeContent = JSON.parse(previewData);
            } catch (e) { }
          }
        }

        // 3. Fetch Products
        const { data: prods } = await supabase
          .from('products')
          .select('*')
          .eq('business_id', businessId);
        setProducts(prods || []);

        // 4. Fetch Categories
        const { data: cats } = await supabase
          .from('categories')
          .select('*')
          .eq('business_id', businessId);
        setCategories(cats || []);

        // Define the beautiful default/fallback content
        const defaults = {
          hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          hero_heading: 'shine on the',
          hero_subtext: 'beauty that reflects your spirits',
          banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
          banner_title: 'effortless beauty, timeless charm ahead.',
          banner_subtitle: 'new arrivals now in stock',
          ticker_text: 'effortless beauty, timeless charm ahead • new arrivals now in stock • effortless beauty, timeless charm ahead • new arrivals now in stock • ',
          footer_about: 'born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone',
          support_email: `support@${slug}.com`,
          support_phone: '+1 123 456 7890',
          physical_address: '123 Creative Lane, Art City',
          instagram_images: [
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop'
          ]
        };

        // Combine defaults with real data
        const finalConfig = { ...defaults };
        if (homeContent) {
          // Priority: homeContent values, then defaults
          Object.keys(defaults).forEach(key => {
            if (homeContent[key] && homeContent[key] !== '') {
              finalConfig[key] = homeContent[key];
            }
          });

          // Also include any extra fields from homeContent (like logos or custom links)
          Object.keys(homeContent).forEach(key => {
            if (!defaults[key] && homeContent[key]) {
              finalConfig[key] = homeContent[key];
            }
          });
        }

        setConfig(finalConfig);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, businessId]);

  useEffect(() => {
    if (config?.logo_url || config?.logo) {
      window.dispatchEvent(new CustomEvent('carthive-logo-update', {
        detail: config.logo_url || config.logo
      }));
    }
  }, [config]);

  const [activePolicy, setActivePolicy] = useState(null); // { title: string, content: string }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f1f0ea' }}>
      {/* Hero Shimmer */}
      <div className="shimmer-effect" style={{ height: '85vh', margin: '30px', borderRadius: '40px' }}></div>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div className="shimmer-effect" style={{ width: '200px', height: '40px', borderRadius: '4px' }}></div>
          <div className="shimmer-effect" style={{ width: '100px', height: '40px', borderRadius: '4px' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="shimmer-effect" style={{ aspectRatio: '0.85', borderRadius: '25px' }}></div>
          ))}
        </div>
      </div>
    </div>
  );
  if (error) return <div className="container section-padding" style={{ textAlign: 'center' }}><h1>{error}</h1><Link to="/">Go back home</Link></div>;

  const MOCK_PRODUCTS = [
    { id: 'm1', name: 'Summer Whisper', price: 450, image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop', is_bestseller: true, description: 'A light, airy abstract piece with soft pastel strokes and bright accents.' },
    { id: 'm2', name: 'Morning Dew', price: 320, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop', is_bestseller: true, description: 'Fresh and vibrant floral study capturing the first light of day.' },
    { id: 'm3', name: 'Azure Horizon', price: 280, image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop', is_bestseller: true, description: 'Minimalist coastal abstract with soothing blue and white tones.' },
    { id: 'm4', name: 'Golden Glow', price: 550, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&h=800&fit=crop', is_bestseller: true, description: 'Radiant abstract composition celebrating warmth and light.' },
    { id: 'm5', name: 'Ocean Breath', price: 390, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop', is_bestseller: true, description: 'A calming abstract with deep oceanic blues.' },
    { id: 'm6', name: 'Velvet Sky', price: 420, image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop', is_bestseller: true, description: 'Soft purples and deep indigos.' },
    { id: 'm7', name: 'Sunbeam', price: 290, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop', is_bestseller: true, description: 'Bright yellow energy on canvas.' },
    { id: 'm8', name: 'Earthly Ties', price: 310, image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop', is_bestseller: true, description: 'Organic textures and tones.' },
    { id: 'm9', name: 'Forest Echo', price: 480, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&h=800&fit=crop', is_bestseller: true, description: 'Deep greens and misty grays.' },
    { id: 'm10', name: 'Lunar Path', price: 360, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop', is_bestseller: true, description: 'Monochrome abstract moonlight.' }
  ];

  const MOCK_CATEGORIES = [
    { id: 'c1', name: 'modern abstract', cover_img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop' },
    { id: 'c2', name: 'minimalist', cover_img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop' },
    { id: 'c3', name: 'floral studies', cover_img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop' }
  ];

  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;
  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;
  const bestSellers = displayProducts.filter(p => p.is_bestseller).slice(0, 5);

  const openPolicy = (title, content) => {
    // If content is empty, provide professional defaults based on title
    if (!content || content.trim() === '') {
      const defaults = {
        'terms & conditions': `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${business.name}. We reserve the right to modify these terms at any time.`,
        'privacy policy': `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
        'shipping policy': `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
        'refund policy': `We want you to be completely satisfied with your purchase. We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`
      };
      content = defaults[title.toLowerCase()] || 'Policy content coming soon...';
    }
    setActivePolicy({ title, content });
  };

  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  return (
    <div className={`wix-layout ${isPreview ? 'preview-mode' : ''}`}>
      {/* 1. Hero Section */}
      <section className="hero-container">
        <img
          src={config.hero_image}
          alt={business.name}
          className="hero-image"
        />
        <div className="hero-content">
          <h1 className="hero-h1">{config.hero_heading}</h1>
          <p className="hero-p">{config.hero_subtext}</p>
          <Link to={`/${slug}/products`} className="btn-shop">
            shop now
          </Link>
        </div>
      </section>

      {/* 1.5 Magazine About Section */}
      {business.about_store && (
        <section className="section-magazine-about reveal-on-scroll">
          <div className="magazine-about-content">
            <span className="magazine-label">The Story of {business.name}</span>
            <p className="magazine-text">
              {business.about_store}
            </p>
            <div className="magazine-divider"></div>
          </div>
        </section>
      )}

      {/* 2. Best Sellers Section - Strictly based on is_bestseller */}
      {bestSellers.length > 0 && (
        <section className="section-best-sellers reveal-on-scroll">
          <div className="section-best-sellers-content">
            <div className="section-header reveal-on-scroll stagger-1">
              <h2 className="section-title">Best Sellers</h2>
              <Link to={`/${slug}/products`} className="btn-view-more">view more</Link>
            </div>

            <div className="best-sellers-grid">
              {bestSellers.map((product, idx) => (
                <Link
                  key={product.id}
                  to={product.id.startsWith('m') ? '#' : `/${slug}/product/${product.id}`}
                  className={`category-card-screenshot reveal-on-scroll stagger-${idx + 1}`}
                  style={{ alignItems: 'flex-start', textAlign: 'left' }}
                >
                  <div className="category-image-container" style={{ marginBottom: '1.2rem' }}>
                    {product.offer_price && <span className="offer-badge">SALE</span>}
                    <img src={product.image} alt={product.name} />
                    
                    {/* Transforming Cart Button (Floating) */}
                    <div className="home-card-action-wrapper" onClick={(e) => e.preventDefault()}>
                      {cart.find(item => item.id === product.id) ? (
                        <div className="home-card-qty-selector">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const item = cart.find(i => i.id === product.id);
                              if (item.quantity === 1) {
                                removeFromCart(product.id);
                              } else {
                                updateQuantity(product.id, -1);
                              }
                            }} 
                            className="home-qty-btn"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="home-qty-current">{cart.find(i => i.id === product.id).quantity}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(product.id, 1);
                            }} 
                            className="home-qty-btn"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="home-add-btn"
                        >
                          <ShoppingBag size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="product-item-info" style={{ padding: '0 0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{product.name}</h3>
                    <p className="product-item-description" style={{ fontSize: '0.85rem', marginBottom: '0.8rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <p className="product-item-price" style={{ fontWeight: '800', fontSize: '1.1rem' }}>₹{Number(product.price).toFixed(0)}</p>
                      {product.offer_price && (
                        <p style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.9rem', opacity: 0.6 }}>
                          ₹{Number(product.offer_price).toFixed(0)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Banner Section */}
      <section className="section-featured-banner">
        <div className="featured-banner-container" style={{ backgroundImage: `url(${config.banner_image})` }}>
          <div className="featured-banner-content">
            <h2 className="featured-banner-h2">{config.banner_title || 'shine on'}</h2>
            <p className="featured-banner-p">{config.banner_subtitle || 'beauty that reflects your spirits'}</p>
            <Link to={`/${slug}/products`} className="btn-shop-dark" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.2)' }}>shop now</Link>
          </div>
        </div>

        {/* 4. Marquee Ticker */}
        <div className="marquee-ticker">
          <div className="marquee-scroll">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="marquee-text">
                {config.ticker_text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shop by Category - Screenshot Match (Moved Below Banner) */}
      <section className="section-categories">
        <div className="category-section-header">
          <h2>shop by category</h2>
          <Link to={`/${slug}/products`} className="btn-shop-now-outline">shop now</Link>
        </div>
        <div className="categories-grid-screenshot">
          {displayCategories.map(cat => {
            // Find the first product in this category to use its image as a thumbnail fallback
            const sampleProduct = displayProducts.find(p => p.category_id === cat.id);
            const displayImage = cat.cover_img || (sampleProduct ? sampleProduct.image : null);

            return (
              <Link key={cat.id} to={cat.id.startsWith('c') ? '#' : `/${slug}/products?category=${cat.id}`} className="category-card-screenshot">
                <div className="category-image-container">
                  {displayImage ? (
                    <img src={displayImage} alt={cat.name} />
                  ) : (
                    <div className="category-placeholder-custom">
                      <span style={{ fontSize: '3rem', opacity: 0.1 }}>{cat.name[0]}</span>
                    </div>
                  )}
                </div>
                <div className="category-label-pill">
                  {cat.name}
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* 5. Our Story Section */}
      <section className="section-our-story">
        <div className="section-our-story-content">
          <div className="story-container">
            <div className="story-decor-1">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 80c0-20 0-40 0-40M50 40c8-15 25-15 25 0s-17 15-25 0M50 40c-8-15-25-15-25 0s17 15 25 0M50 40c15-8 15-25 0-25s-15 17-0 25M50 40c15 8 15 25 0 25s-15-17-0-25" />
                <path d="M50 60c5 0 10-5 10-10M50 70c-5 0-10-5-10-10" />
              </svg>
            </div>
            <div className="story-decor-2">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 80c10-10 20-30 40-40M70 40c5-10 15-10 15 0s-10 15-15 0M70 40c-5-10-15-10-15 0s10 15 15 0" />
                <path d="M40 60c-5 5-15 5-15 0s5-15 15-0M50 50c5 5 15 5 15 0s-5-15-15-0" />
              </svg>
            </div>
            <h2 className="story-title reveal-on-scroll reveal-drop-in stagger-1">our story</h2>
            <p className="story-main-text reveal-on-scroll reveal-drop-in stagger-2">
              {config.our_story || config.footer_about}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Instagram Section */}
      <section className="section-instagram">
        <div className="instagram-content">
          <a
            href={config.instagram_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="instagram-icon reveal-on-scroll stagger-1">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <h2 className="instagram-h2 reveal-on-scroll stagger-2">Follow Us on Instagram</h2>
            <span className="instagram-hashtag reveal-on-scroll stagger-3">
              #{business.name.toLowerCase().replace(/\s/g, '_')}_beauty
            </span>
          </a>
        </div>

        <div className="instagram-grid-container">
          <div className="instagram-row">
            {config.instagram_images?.slice(0, 3).map((img, i) => (
              <div key={`row1-${i}`} className="instagram-img-wrapper">
                <img src={img} alt="Social Feed" />
              </div>
            ))}
          </div>
          <div className="instagram-row">
            {config.instagram_images?.slice(3, 6).map((img, i) => (
              <div key={`row2-${i}`} className="instagram-img-wrapper">
                <img src={img} alt="Social Feed" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Multi-column Footer */}
      <footer className="footer-simple">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to={`/${slug}`} className="footer-simple-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {(config.logo_url || business.logo_url || business.logo || business.avatar_url) && (
                <img
                  src={config.logo_url || business.logo_url || business.logo || business.avatar_url}
                  alt={business.name}
                  style={{ height: '40px', width: '40px', borderRadius: '4px', objectFit: 'contain' }}
                />
              )}
              {business.name}
            </Link>
            <p>{config.footer_about?.substring(0, 120)}...</p>
            <div className="footer-social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {config.instagram_link && (
                <a href={config.instagram_link} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {config.facebook_link && (
                <a href={config.facebook_link} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
              {config.twitter_link && (
                <a href={config.twitter_link} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              )}
              {config.linkedin_link && (
                <a href={config.linkedin_link} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              )}
              {config.whatsapp_link && (
                <a href={config.whatsapp_link} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                </a>
              )}
            </div>
          </div>

          <div className="footer-col">
            <h4>shop</h4>
            <ul>
              <li><Link to={`/${slug}/products`}>all products</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>support</h4>
            <ul>
              <li><Link to="/track">track order</Link></li>
              <li><p>{config.support_phone}</p></li>
              <li><p>{config.support_email}</p></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>legal</h4>
            <ul>
              <li><button onClick={() => openPolicy('terms & conditions', config.terms_and_conditions)} className="footer-link-btn">terms & conditions</button></li>
              <li><button onClick={() => openPolicy('privacy policy', config.privacy_policy)} className="footer-link-btn">privacy policy</button></li>
              <li><button onClick={() => openPolicy('shipping policy', config.shipping_policy)} className="footer-link-btn">shipping policy</button></li>
              <li><button onClick={() => openPolicy('refund policy', config.refund_policy)} className="footer-link-btn">refund policy</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-simple-bottom">
          <p>© 2026 {business.name}. all rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>built by carthive</span>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicy && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setActivePolicy(null)}
        >
          <div
            style={{
              background: '#fff', width: '100%', maxWidth: '800px', maxHeight: '80vh',
              borderRadius: '24px', padding: '3rem', position: 'relative', overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePolicy(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: '#f1f5f9', border: 'none', width: '40px', height: '40px',
                borderRadius: '50%', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
              }}
            >
              ×
            </button>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', textTransform: 'lowercase' }}>{activePolicy.title}</h2>
            <div style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>
              {activePolicy.content}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default BusinessHome;
