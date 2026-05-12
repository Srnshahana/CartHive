import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Search } from 'lucide-react';

const ProductList = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [business, setBusiness] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        if (!biz) return;
        setBusiness(biz);

        const { data: homeContent } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('business_id', biz.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        setConfig(homeContent?.[0] || {});

        const { data: cats } = await supabase.from('categories').select('*').eq('business_id', biz.id);
        setCategories(cats || []);

        const params = new URLSearchParams(location.search);
        const catId = params.get('category');
        if (catId) setSelectedCategory(catId);

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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f1f0ea', padding: '120px 2rem 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="shimmer-effect" style={{ height: '40px', borderRadius: '8px' }}></div>
            <div className="shimmer-effect" style={{ height: '200px', borderRadius: '8px' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="shimmer-effect" style={{ aspectRatio: '0.85', borderRadius: '12px' }}></div>
                <div className="shimmer-effect" style={{ height: '20px', width: '60%', borderRadius: '4px' }}></div>
                <div className="shimmer-effect" style={{ height: '16px', width: '40%', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="all-products-page">
      <div className="container">
        
        <div className="catalog-layout">
          {/* Onsko Sidebar */}
          <aside className="catalog-sidebar">
            {/* Search Input */}
            <div className="sidebar-section">
              <div className="onsko-search-wrapper">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="onsko-search-input"
                />
              </div>
            </div>

            <div className="sidebar-section">
              <h3>browse by</h3>
              <div className="sidebar-divider"></div>
              <div className="sidebar-list">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`sidebar-link ${selectedCategory === 'all' ? 'active' : ''}`}
                >
                  all products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`sidebar-link ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.name.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>filter by</h3>
              <div className="sidebar-divider"></div>
              <div style={{ padding: '0 5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>price</span>
                  <span style={{ fontSize: '0.85rem' }}>—</span>
                </div>
                <div style={{ height: '2px', background: '#1a1a1a', position: 'relative', marginBottom: '15px' }}>
                  <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#1a1a1a', borderRadius: '50%', top: '-5px', left: '0' }}></div>
                  <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#1a1a1a', borderRadius: '50%', top: '-5px', right: '0' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Onsko Product Grid */}
          <main className="catalog-main">
            <div className="catalog-grid catalog-grid-entry">
              {filteredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/${slug}/product/${product.id}`} 
                  className="onsko-card"
                >
                  <div className="onsko-image-box">
                    {product.is_bestseller && (
                      <div className="onsko-badge">best seller</div>
                    )}
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="onsko-info">
                    <h3 className="onsko-title">{product.name.toLowerCase()}</h3>
                    <p className="onsko-price">${Number(product.price).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem' }}>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>no products found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
