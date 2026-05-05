// This file simulates the data structure we will eventually get from Supabase

export const supabaseDemo = {
  businesses: [
    {
      id: 'b1',
      name: 'Art Stores',
      slug: 'artstore',
      description: 'Handcrafted masterpieces for your collection.',
      about: 'Welcome to Art Store! We specialize in contemporary oil paintings and digital art. Every piece is unique and made with passion.',
      logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
      banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
      theme_color: '#3b82f6',
      contact_phone: '+1 234 567 890',
      address: '123 Art Lane, Creative City'
    },
    {
      id: 'b2',
      name: 'Mehendi Shop',
      slug: 'mehendi-shop',
      description: 'Traditional and modern henna designs.',
      about: 'Mehendi Shop brings you the finest organic henna and professional bridal services. We have over 10 years of experience in traditional mehendi art.',
      logo: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=400&h=400&fit=crop',
      banner: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=1200&h=400&fit=crop',
      theme_color: '#8b5cf6',
      contact_phone: '+1 987 654 321',
      address: '45 Henna St, Tradition Town'
    }
  ],
  products: [
    {
      id: 'p1',
      business_id: 'b1',
      name: 'Ethereal Sunset',
      price: 150,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
      description: 'A vibrant acrylic painting capturing the essence of a summer sunset.',
      category: 'Paintings'
    },
    {
      id: 'p2',
      business_id: 'b1',
      name: 'Neon Dreams',
      price: 95,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
      description: 'Modern digital art print with neon color highlights.',
      category: 'Digital'
    },
    {
      id: 'p3',
      business_id: 'b2',
      name: 'Bridal Henna Kit',
      price: 45,
      image: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
      description: 'Everything you need for a professional bridal mehendi application.',
      category: 'Kits'
    },
    {
      id: 'p4',
      business_id: 'b2',
      name: 'Organic Cone 5-Pack',
      price: 25,
      image: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop',
      description: 'Chemical-free henna cones for dark and lasting color.',
      category: 'Supplies'
    }
  ],
  orders: [
    {
      id: 'ord-001',
      business_id: 'b1',
      customer_name: 'Alice',
      customer_phone: '5551234',
      total_price: 150,
      status: 'Processing',
      items: [{ product_id: 'p1', quantity: 1, price: 150 }]
    }
  ]
};
