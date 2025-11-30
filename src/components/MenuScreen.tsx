import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock, Star } from 'lucide-react';
import { Vendor, MenuItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'spicy-burger',
    name: 'Spicy Burger',
    price: 250,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Hot and spicy chicken burger with jalapeños',
    rating: 4.5,
    prepTime: 8
  },
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    price: 200,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    description: 'Traditional beef burger with cheese',
    rating: 4.3,
    prepTime: 10
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    price: 220,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    description: 'Grilled chicken with fresh lettuce',
    rating: 4.4,
    prepTime: 9
  },
  {
    id: 'cold-drink',
    name: 'Cold Drink',
    price: 50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop',
    description: 'Chilled soft drink',
    rating: 4.2,
    prepTime: 2
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
    description: 'Freshly squeezed orange juice',
    rating: 4.6,
    prepTime: 3
  },
  {
    id: 'water',
    name: 'Mineral Water',
    price: 30,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    description: 'Pure mineral water',
    rating: 4.0,
    prepTime: 1
  }
];

const CATEGORIES = ['Burgers', 'Drinks'];

type MenuScreenProps = {
  vendor: Vendor | null;
  onAddToCart: (item: MenuItem) => void;
  onBack: () => void;
  cartItemsCount: number;
};

export default function MenuScreen({ vendor, onAddToCart, onBack, cartItemsCount }: MenuScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('Burgers');

  if (!vendor) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Please select a vendor from the home screen
      </div>
    );
  }

  const filteredItems = MOCK_MENU_ITEMS.filter(
    item => item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-gray-900 px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-95 backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {vendor.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-amber-900">★</span>
              <span className="text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                {vendor.rating} ({vendor.reviews} reviews)
              </span>
            </div>
          </div>
          {cartItemsCount > 0 && (
            <div className="bg-white text-amber-900 px-4 py-2 rounded-full text-sm font-bold shadow-md animate-pop">
              {cartItemsCount} items
            </div>
          )}
        </div>
      </div>

      {/* Section Description */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <p className="text-gray-600 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
          Choose what you'd like to order
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white border-b-2 border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-semibold ${
                selectedCategory === category
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-[1.01]"
          >
            {/* Large Image */}
            <div className="relative h-48">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Item Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Rating and Prep Time */}
              <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-700 font-semibold text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-600 font-medium text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {item.prepTime} min
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-amber-600 font-bold text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Rs. {item.price}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 px-5 py-2.5 rounded-xl hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 font-bold"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
