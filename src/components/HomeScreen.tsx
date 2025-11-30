import React, { useState } from 'react';
import { Search, Heart, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Vendor, Order } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

const MOCK_VENDORS: Vendor[] = [
  {
    id: 'raju',
    name: 'Raju',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'cafe',
    name: 'Cafe',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    rating: 4.3,
    reviews: 189
  },
  {
    id: 'mess',
    name: 'Mess',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 412
  }
];

type HomeScreenProps = {
  onSelectVendor: (vendor: Vendor) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  currentOrder: Order | null;
};

export default function HomeScreen({ onSelectVendor, favorites, onToggleFavorite, currentOrder }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = MOCK_VENDORS.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400 text-amber-900';
      case 'ready':
        return 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 text-green-900';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing...';
      case 'ready':
        return 'Ready for pickup!';
      default:
        return 'Completed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-gray-900 px-4 py-5 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-amber-900" />
          <h1 className="text-center text-2xl font-bold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            GIKI Food Ordering
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm transition-all"
            style={{ fontFamily: 'Lato, sans-serif' }}
          />
        </div>
      </div>

      {/* Order Tracking Widget */}
      {currentOrder && currentOrder.status !== 'completed' && (
        <div className="p-4 pb-0 animate-slide-up">
          <div className={`rounded-2xl border-2 p-4 shadow-lg ${getStatusColor(currentOrder.status)} animate-pop`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {currentOrder.status === 'preparing' ? (
                  <div className="relative">
                    <Clock className="w-7 h-7 text-amber-700" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <CheckCircle className="w-7 h-7 text-green-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-base" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Order {currentOrder.orderNumber}
                  </span>
                  <span className="text-sm font-semibold px-2 py-1 bg-white/50 rounded-full">
                    {getStatusText(currentOrder.status)}
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-1 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {currentOrder.vendor}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Pickup at {currentOrder.pickupTime}</span>
                  <span className="font-bold bg-white/60 px-2 py-0.5 rounded-full">Rs. {currentOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Title */}
      <div className="px-4 pt-5 pb-2">
        <h2 className="text-gray-900 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Choose where to order
        </h2>
        <p className="text-gray-600 text-sm mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
          Select a vendor to browse their menu
        </p>
      </div>

      {/* Vendors Grid */}
      <div className="p-4 pt-2">
        <div className="grid grid-cols-1 gap-5">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor(vendor)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative h-56">
                <ImageWithFallback
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(vendor.id);
                  }}
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-transform active:scale-95"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      favorites.has(vendor.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              
              <div className="p-5">
                <h3 className="text-gray-900 mb-3 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {vendor.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(vendor.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="text-gray-700 font-semibold ml-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {vendor.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                    ({vendor.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
