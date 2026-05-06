import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const BusinessHome = () => {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Business
        const { data: biz, error: bizErr } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single();

        if (bizErr || !biz) throw new Error('Store not found');
        setBusiness(biz);

        // 2. Fetch Homepage Content
        const { data: homeContent, error: homeErr } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('business_id', biz.id)
          .single();

        // 4. Fetch Categories
        const { data: cats } = await supabase
          .from('categories')
          .select('*')
          .eq('business_id', biz.id);
        setCategories(cats || []);

        setProducts(prods || []);
        
        // Use database content if available, otherwise fall back to demo reference
        if (homeContent) {
          setConfig(homeContent);
        } else {
          // Fallback to reference Art Store values as requested
          setConfig({
            hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
            hero_heading: 'shine on',
            hero_subtext: 'beauty that reflects your spirit',
            banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
            banner_title: 'effortless beauty, timeless charm.',
            banner_subtitle: 'new arrivals now in stock',
            ticker_text: 'orders over $50 ✿ free shipping on orders over $50 ✿',
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
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="container section-padding" style={{ textAlign: 'center' }}><p>Loading store...</p></div>;
  if (error) return <div className="container section-padding" style={{ textAlign: 'center' }}><h1>{error}</h1><Link to="/">Go back home</Link></div>;

  const bestSellers = products.filter(p => p.is_bestseller);

  return (
    <div className="wix-layout">
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

      {/* 2. Shop by Category */}
      {categories.length > 0 && (
        <section className="section-categories">
          <div className="section-header">
            <h2 className="section-title">shop by category</h2>
          </div>
          <div className="categories-scroll">
            {categories.map(cat => {
              // Find the first product in this category to use its image as a thumbnail
              const sampleProduct = products.find(p => p.category_id === cat.id);
              return (
                <Link key={cat.id} to={`/${slug}/products?category=${cat.id}`} className="category-card">
                  <div className="category-card-image">
                    {sampleProduct ? (
                      <img src={sampleProduct.image} alt={cat.name} />
                    ) : (
                      <div className="category-placeholder">
                        <span style={{ fontSize: '2rem', opacity: 0.2 }}>{cat.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="category-card-name">{cat.name}</h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Best Sellers Section - Strictly based on is_bestseller */}
      {bestSellers.length > 0 && (
        <section className="section-best-sellers">
          <div className="section-header">
            <h2 className="section-title">best sellers</h2>
            <Link to={`/${slug}/products`} className="btn-view-more">view more</Link>
          </div>

          <div className="best-sellers-grid">
            {bestSellers.map(product => (
              <Link 
                key={product.id} 
                to={`/${slug}/product/${product.id}`} 
                className="product-item"
              >
                <div className="product-item-image">
                  <span className="badge-best-seller">best seller</span>
                  {product.offer_price && <span className="offer-badge">SALE</span>}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-item-info">
                  <h3>{product.name}</h3>
                  <p className="product-item-description">{product.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p className="product-item-price">${Number(product.price).toFixed(2)}</p>
                    {product.offer_price && (
                      <p style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.9rem', opacity: 0.6 }}>
                        ${Number(product.offer_price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. Featured Banner Section */}
      <section className="section-featured-banner">
        <div className="featured-banner-container" style={{ backgroundImage: `url(${config.banner_image})` }}>
          <div className="featured-banner-content">
            <h2 className="featured-banner-h2">{config.banner_title}</h2>
            <p className="featured-banner-p">{config.banner_subtitle}</p>
            <Link to={`/${slug}/products`} className="btn-shop-dark">shop now</Link>
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

      {/* 5. Our Story Section */}
      <section className="section-our-story">
        <div className="story-container">
          <h2 className="story-title">our story</h2>
          <p className="story-main-text">{config.footer_about}</p>
        </div>
      </section>

      {/* 6. Instagram Section */}
      <section className="section-instagram">
        <div className="instagram-content">
          <div className="instagram-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <h2 className="instagram-h2">Follow Us on Instagram</h2>
          <a href="#" className="instagram-hashtag">
            #{business.name.toLowerCase().replace(/\s/g, '_')}_beauty
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
            <Link to={`/${slug}`} className="footer-simple-logo">
              {business.name}
            </Link>
            <p>{config.footer_about?.substring(0, 80)}...</p>
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
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">refund policy</a></li>
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
    </div>
  );
};

export default BusinessHome;
