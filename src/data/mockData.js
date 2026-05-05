export const businesses = [
  {
    id: '1',
    name: 'Art Store',
    slug: 'artstore',
    description: 'Beautiful handmade paintings and digital art pieces for your home.',
    logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop',
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Mehendi Shop',
    slug: 'mehendi-shop',
    description: 'Exquisite mehendi designs and organic cones for all occasions.',
    logo: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=1200&h=400&fit=crop',
    color: '#8b5cf6'
  }
];

export const products = {
  'artstore': [
    {
      id: 'p1',
      name: 'Sunset Landscape',
      price: 120,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
      description: 'Original acrylic painting on canvas.'
    },
    {
      id: 'p2',
      name: 'Abstract Blue',
      price: 85,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
      description: 'Modern abstract piece with deep blue tones.'
    },
    {
      id: 'p3',
      name: 'Floral Bouquet',
      price: 65,
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
      description: 'Hand-painted watercolor flowers.'
    }
  ],
  'mehendi-shop': [
    {
      id: 'p4',
      name: 'Organic Cone Pack',
      price: 15,
      image: 'https://images.unsplash.com/photo-1590670460285-0221f7741162?w=600&h=600&fit=crop',
      description: 'Set of 5 100% natural mehendi cones.'
    },
    {
      id: 'p5',
      name: 'Bridal Service',
      price: 250,
      image: 'https://images.unsplash.com/photo-1621511211110-8276f5787627?w=600&h=600&fit=crop',
      description: 'Full bridal mehendi package including hands and feet.'
    }
  ]
};

export const orders = [
  {
    id: 'ord-123',
    businessId: '1',
    customerName: 'John Doe',
    customerPhone: '1234567890',
    items: [{ productId: 'p1', quantity: 1, name: 'Sunset Landscape', price: 120 }],
    status: 'Pending',
    createdAt: '2024-03-20T10:00:00Z',
    total: 120
  }
];
