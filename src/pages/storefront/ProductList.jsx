import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, ArrowLeft, Filter, ChevronRight, Star } from 'lucide-react';

const ProductList = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Business
        const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        if (!biz) return;
        setBusiness(biz);

        // Fetch Categories
        const { data: cats } = await supabase.from('categories').select('*').eq('business_id', biz.id);
        setCategories(cats || []);

        // Handle category query param
        const params = new URLSearchParams(location.search);
        const catId = params.get('category');
        if (catId) setSelectedCategory(catId);

        // Fetch Products with Categories
        let query = supabase.from('products').select('*, categories(*)').eq('business_id', biz.id);
        const { data: prods } = await query;
        setProducts(prods || []);
      } catch (err) {
        console.error('Error fetching storefront products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, location.search]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category_id === selectedCategory);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="all-products-page">
      <div className="container">
        {/* Header Section */}
        <div style={{ marginBottom: '4rem' }}>
          <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '600', marginBottom: '1.5rem' }}>
            <ArrowLeft size={18} /> Back to {business?.name || 'Home'}
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '0.5rem' }}>Full <span className="gradient-text">Catalog</span></h1>
              <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Discover our entire collection of premium {business?.name} products.</p>
            </div>
            <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
              {filteredProducts.length} Products
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4rem' }}>
          {/* Sidebar Filters */}
          <aside style={{ width: '250px', flexShrink: 0 }}>
            <div style={{ sticky: 'top: 120px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} /> Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  style={{ 
                    background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem 0', 
                    fontSize: '1rem', fontWeight: selectedCategory === 'all' ? '800' : '500',
                    color: selectedCategory === 'all' ? '#3b82f6' : '#64748b', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{ 
                      background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem 0', 
                      fontSize: '1rem', fontWeight: selectedCategory === cat.id ? '800' : '500',
                      color: selectedCategory === cat.id ? '#3b82f6' : '#64748b', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main style={{ flex: 1 }}>
            <div className="all-products-grid">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/${slug}/product/${product.id}`} className="product-item">
                  <div className="product-item-image">
                    {product.is_bestseller && (
                      <div className="badge-best-seller" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, background: '#f59e0b', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900' }}>BEST SELLER</div>
                    )}
                    {product.offer_price && (
                      <div className="offer-badge">SALE</div>
                    )}
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-item-info">
                    <p style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      {product.categories?.name || 'Collection'}
                    </p>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <p className="product-item-price">${product.price}</p>
                      {product.offer_price && (
                        <p style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.9rem', opacity: 0.6 }}>${product.offer_price}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem', background: '#f8fafc', borderRadius: '30px' }}>
                <ShoppingBag size={48} color="#94a3b8" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>No products found</h3>
                <p style={{ color: '#64748b' }}>Try selecting a different category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
