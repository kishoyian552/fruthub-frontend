// src/data/products.js
export const products = [
  {
    id: 1,
    name: 'Fresh Apples',
    description: 'Crisp and sweet red apples, perfect for snacking',
    price: 49,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    inStock: true,
    rating: 4.5,
    reviews: 23
  },
  {
    id: 2,
    name: 'Organic Bananas',
    description: 'Rich in potassium, perfect for energy boost',
    price: 55,
    image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    inStock: true,
    rating: 4.7,
    reviews: 30
  },
  {
    id: 3,
    name: 'Sweet Oranges',
    description: 'Juicy and full of vitamin C',
    price: 60,
    image: 'https://images.pexels.com/photos/161559/pexels-photo-161559.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Citrus',
    inStock: false,
    rating: 4.2,
    reviews: 18
  },
  {
    id: 4,
    name: 'Golden Mangoes',
    description: 'Tropical and sweet mangoes full of flavor',
    price: 75,
    image: 'https://images.pexels.com/photos/1239312/pexels-photo-1239312.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tropical',
    inStock: true,
    rating: 4.9,
    reviews: 40
  }
]

// Helper to get one product
export const getProductById = (id) => products.find(p => p.id === id)
