// This file simulates the data structure we will eventually get from Supabase

export const supabaseDemo = {
  businesses: [
    {
      id: 'b1',
      name: 'Art Store',
      slug: 'artstore',
      description: 'Handcrafted masterpieces for your collection.',
      about: 'Welcome to Art Store! We specialize in contemporary oil paintings and digital art. Every piece is unique and made with passion.',
      logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
      banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
      theme_color: '#3b82f6',
      contact_phone: '+1 234 567 890',
      address: '123 Art Lane, Creative City',
      // Home Screen Configuration
      home_config: {
        hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
        hero_text: 'shine on',
        hero_subtext: 'beauty that reflects your spirit',
        best_sellers_ids: ['p1', 'p2'], 
        banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
        banner_text_main: 'effortless beauty, timeless charm.',
        banner_text_sub: 'new arrivals now in stock',
        moving_text: 'orders over $50 ✿ free shipping on orders over $50 ✿',
        story_text: 'born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone',
        story_subtext: 'for every body, anywhere',
        instagram_heading: 'Follow Us on Instagram',
        instagram_link: 'https://instagram.com/artstore',
        social_images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop'
        ],
        footer_email: 'support@artstore.com',
        footer_phone: '+1 123 456 7890',
        footer_address: '123 Art Lane, Creative City'
      }
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
      address: '45 Henna St, Tradition Town',
      home_config: {
        hero_image: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=1200&h=400&fit=crop',
        hero_text: 'pure henna',
        hero_subtext: 'traditional art for modern souls',
        best_sellers_ids: ['p3', 'p4'],
        banner_image: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=1200&h=400&fit=crop',
        banner_text_main: 'bridal elegance, naturally sourced.',
        banner_text_sub: 'book your session now',
        moving_text: 'organic henna cones ✿ long lasting deep stain ✿ free shipping on kits ✿',
        story_text: 'bringing the ancient art of mehendi to your doorstep with 100% organic ingredients and heritage designs',
        story_subtext: 'authentic. natural. beautiful.',
        instagram_heading: 'Our Instagram Feed',
        instagram_link: 'https://instagram.com/mehendishop',
        social_images: [
          'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop'
        ],
        footer_email: 'hello@mehendishop.com',
        footer_phone: '+1 987 654 321',
        footer_address: '45 Henna St, Tradition Town'
      }
    }
  ],
  categories: [
    { id: 'c1', business_id: 'b1', name: 'Paintings', product_ids: ['p1', 'p2'] },
    { id: 'c2', business_id: 'b1', name: 'Digital Art', product_ids: ['p2'] },
    { id: 'c3', business_id: 'b2', name: 'Kits', product_ids: ['p3'] },
    { id: 'c4', business_id: 'b2', name: 'Organic Cones', product_ids: ['p4'] }
  ],
  template_categories: [
    { id: 'tc1', name: 'Fashion' },
    { id: 'tc2', name: 'Luxury' },
    { id: 'tc3', name: 'Minimal' },
    { id: 'tc4', name: 'Beauty' },
    { id: 'tc5', name: 'Lifestyle' },
    { id: 'tc6', name: 'Artisan' },
    { id: 'tc7', name: 'Electronics' }
  ],
  products: [
    {
      id: 'p1',
      business_id: 'b1',
      name: 'Ethereal Sunset',
      price: 150,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
      description: 'A vibrant acrylic painting capturing the essence of a summer sunset.',
      category: 'Paintings',
      offer_price: 120,
      offer_tagline: '20% off today',
      is_combo: false
    },
    {
      id: 'p2',
      business_id: 'b1',
      name: 'Neon Dreams',
      price: 95,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
      description: 'Modern digital art print with neon color highlights.',
      category: 'Digital',
      offer_price: 75,
      offer_tagline: 'limited edition sale',
      is_combo: false
    },
    {
      id: 'p3',
      business_id: 'b2',
      name: 'Bridal Henna Kit',
      price: 45,
      image: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
      description: 'Everything you need for a professional bridal mehendi application.',
      category: 'Kits',
      offer_price: 35,
      offer_tagline: 'bridal season deal',
      is_combo: true
    },
    {
      id: 'p4',
      business_id: 'b2',
      name: 'Organic Cone 5-Pack',
      price: 25,
      image: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop',
      description: 'Chemical-free henna cones for dark and lasting color.',
      category: 'Supplies',
      offer_price: 20,
      offer_tagline: '',
      is_combo: false
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
