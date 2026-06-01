import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, ShieldCheck, Package, MapPin, User, CheckCircle, CreditCard, Upload, QrCode } from 'lucide-react';

const Checkout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [business, setBusiness] = useState(null);
  const [step, setStep] = useState('details'); // 'details' or 'payment'
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    pincode: '',
    landmark: '',
    address_line: '',
    customisation: ''
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await supabase.from('businesses').select('*').eq('slug', slug).single();
      setBusiness(data);
    };
    fetchBusiness();

    if (cart.length === 0 && !success) {
      navigate(`/${slug}/cart`);
    }
  }, [slug, cart.length, navigate, success]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile } = await supabase.from('customers').select('*').eq('id', session.user.id).single();
          if (profile) {
            setFormData(prev => ({
              ...prev,
              customer_name: profile.full_name || prev.customer_name,
              email: profile.email || prev.email,
              phone: profile.phone || prev.phone,
              state: profile.state || prev.state,
              district: profile.city || prev.district,
              pincode: profile.postal_code || prev.pincode,
              address_line: profile.address_line_1 || prev.address_line,
            }));
          }
        }
      } catch (err) {
        console.error('Error prefilling customer data:', err);
      }
    };
    fetchCustomerData();
  }, []);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!receiptFile) {
      alert('Please upload your payment receipt image.');
      return;
    }

    setLoading(true);

    try {
      // 0. Auto-save address to customer profile if logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from('customers').upsert({
          id: session.user.id,
          email: session.user.email,
          full_name: formData.customer_name,
          phone: formData.phone,
          address_line_1: formData.address_line,
          city: formData.district,
          state: formData.state,
          postal_code: formData.pincode
        });
      }

      let receiptUrl = '';
      
      // 1. Upload Receipt Image
      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('order-receipts')
        .upload(filePath, receiptFile);

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Failed to upload receipt: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('order-receipts')
        .getPublicUrl(filePath);
        
      receiptUrl = urlData.publicUrl;

      if (!receiptUrl) {
        throw new Error('Could not generate public URL for receipt.');
      }

      // 2. Create orders (only if we have a receipt URL)
      const orderPromises = cart.map(item => {
        return supabase.from('orders').insert([{
          business_id: business.id,
          product_id: item.id,
          customer_name: formData.customer_name,
          phone: formData.phone,
          state: formData.state,
          district: formData.district,
          pincode: formData.pincode,
          landmark: formData.landmark,
          address_line: formData.address_line,
          quantity: item.quantity,
          status: 'pending',
          total_amount: item.price * item.quantity,
          customisation: formData.customisation,
          payment_reciept: receiptUrl
        }]);
      });

      const results = await Promise.all(orderPromises);
      
      // Check for insertion errors
      const firstError = results.find(r => r.error);
      if (firstError) {
        throw new Error(`Order insertion failed: ${firstError.error.message}`);
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="boutique-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: '60px', borderRadius: '24px', maxWidth: '500px', width: '100%', border: '1px solid #dcdbd5' }}>
          <div style={{ background: '#f1f0ea', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <CheckCircle size={40} color="#10b981" />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: '800', marginBottom: '15px' }}>order confirmed!</h2>
          <p style={{ color: '#666', marginBottom: '40px', lineHeight: 1.6, fontSize: 'clamp(0.9rem, 4vw, 1rem)' }}>
            Your payment receipt has been submitted. {business?.name} will verify your payment and process your order shortly.
          </p>
          <Link to={`/${slug}/products`} className="boutique-btn">return to shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="boutique-page-wrapper">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          {step === 'payment' && (
            <button onClick={() => setStep('details')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="cart-title" style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>{step === 'details' ? 'checkout' : 'payment'}</h1>
        </div>

        <div className="cart-grid">
          {/* Main Content Area */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #dcdbd5' }}>
            
            {step === 'details' ? (
              <form onSubmit={handleNextStep}>
                <div style={{ marginBottom: '40px' }}>
                  <h3 className="checkout-step-title"><User size={16} /> customer information</h3>
                  <div className="checkout-form-row">
                    <div className="checkout-input-group">
                      <label>full name</label>
                      <input required type="text" value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} />
                    </div>
                    <div className="checkout-input-group">
                      <label>email address</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="checkout-input-group">
                    <label>phone number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h3 className="checkout-step-title"><MapPin size={16} /> shipping address</h3>
                  <div className="checkout-form-row">
                    <div className="checkout-input-group">
                      <label>state</label>
                      <input required type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                    </div>
                    <div className="checkout-input-group">
                      <label>district</label>
                      <input required type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} />
                    </div>
                  </div>
                  <div className="checkout-form-row">
                    <div className="checkout-input-group">
                      <label>pincode</label>
                      <input required type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                    </div>
                    <div className="checkout-input-group">
                      <label>landmark</label>
                      <input type="text" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} />
                    </div>
                  </div>
                  <div className="checkout-input-group">
                    <label>address line</label>
                    <textarea required rows="3" value={formData.address_line} onChange={(e) => setFormData({...formData, address_line: e.target.value})} />
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h3 className="checkout-step-title"><Package size={16} /> additional details</h3>
                  <div className="checkout-input-group">
                    <label>customisation requests</label>
                    <textarea rows="2" value={formData.customisation} onChange={(e) => setFormData({...formData, customisation: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="boutique-btn" style={{ height: '64px' }}>
                  continue to payment
                </button>
              </form>
            ) : (
              <div className="payment-step">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{ background: '#f1f0ea', display: 'inline-flex', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
                    {business?.payment_qr_url ? (
                      <img src={business.payment_qr_url} alt="Payment QR" style={{ width: '200px', height: '200px' }} />
                    ) : (
                      <div style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                        <QrCode size={60} strokeWidth={1} />
                        <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>QR Code Not Set</p>
                      </div>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px' }}>scan to pay</h2>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Please scan the QR code above to pay the total amount of <strong>₹{Number(cartTotal).toFixed(0)}</strong></p>
                </div>

                <div style={{ border: '2px dashed #dcdbd5', borderRadius: '12px', padding: '30px', textAlign: 'center', background: '#fafafa' }}>
                  {!receiptPreview ? (
                    <div style={{ padding: '20px 0' }}>
                      <Upload size={40} color="#aaa" style={{ marginBottom: '15px' }} />
                      <h4 style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: '700' }}>upload payment receipt</h4>
                      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '25px', maxWidth: '300px', margin: '0 auto 25px' }}>Take a screenshot of your payment confirmation and upload it here.</p>
                      <input 
                        type="file" 
                        id="receipt-upload" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="receipt-upload" className="boutique-btn" style={{ display: 'inline-flex', padding: '0 30px', background: '#1a1a1a', color: '#fff', cursor: 'pointer' }}>
                        select image
                      </label>
                    </div>
                  ) : (
                    <div style={{ width: '100%' }}>
                      <div style={{ width: '100%', height: '250px', background: '#eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={receiptPreview} alt="Receipt Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent: 'center' }}>
                        <button 
                          onClick={() => {setReceiptFile(null); setReceiptPreview(null);}} 
                          className="boutique-btn" 
                          style={{ background: '#eee', color: '#1a1a1a', border: '1px solid #dcdbd5', flex: '1', padding: '0 20px', minWidth: '120px' }}
                        >
                          remove
                        </button>
                        <button 
                          onClick={handleFinalSubmit} 
                          disabled={loading} 
                          className="boutique-btn" 
                          style={{ flex: '2', padding: '0 40px', minWidth: '200px' }}
                        >
                          {loading ? 'submitting...' : 'confirm & order'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Side Summary */}
          <div className="cart-summary-box">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '25px', textTransform: 'lowercase' }}>order summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '60px', borderRadius: '4px', background: '#f1f0ea', overflow: 'hidden' }}>
                    <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'lowercase' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#888' }}>x {item.quantity}</p>
                  </div>
                  <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>₹{(item.price * item.quantity).toFixed(0)}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                <span style={{ color: '#666' }}>subtotal</span>
                <span>₹{Number(cartTotal).toFixed(0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                <span style={{ fontWeight: '800' }}>total to pay</span>
                <span style={{ fontWeight: '800', fontSize: '1.3rem' }}>₹{Number(cartTotal).toFixed(0)}</span>
              </div>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
              <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.5 }}>
                Secure checkout. Your shipping details are stored safely and your payment is verified manually by the merchant.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-step-title {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          marginBottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .checkout-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .checkout-input-group label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #1a1a1a;
        }
        .checkout-input-group input, .checkout-input-group textarea {
          padding: 14px 18px;
          border: 1px solid #dcdbd5;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          background: #fdfdfd;
          transition: all 0.2s ease;
        }
        .checkout-input-group input:focus, .checkout-input-group textarea:focus {
          border-color: #1a1a1a;
          background: #fff;
          outline: none;
        }
        .checkout-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .checkout-form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
