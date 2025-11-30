import React, { useState } from 'react';
import { Home, ShoppingCart, User, Menu as MenuIcon } from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import MenuScreen from './components/MenuScreen';
import CartScreen from './components/CartScreen';
import AccountScreen from './components/AccountScreen';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorName: string;
  prepTime: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  prepTime: number;
};

export type Vendor = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  pickupTime: string;
  status: 'preparing' | 'ready' | 'completed';
  items: CartItem[];
  total: number;
  vendor: string;
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const handleSelectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setActiveTab('menu');
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { 
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        vendorName: selectedVendor?.name || '',
        prepTime: item.prepTime
      }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      const updated = prev.map(i => 
        i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
      ).filter(i => i.quantity > 0);
      return updated;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handlePlaceOrder = (paymentMethod: string) => {
    const orderNumber = Math.floor(Math.random() * 9000) + 1000;
    const now = new Date();
    const pickupTime = new Date(now.getTime() + 20 * 60000); // 20 minutes from now
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: `#${orderNumber}`,
      pickupTime: pickupTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'preparing',
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      vendor: selectedVendor?.name || ''
    };

    setCurrentOrder(newOrder);
    setCartItems([]);
    setActiveTab('home');

    // Simulate order status changes
    setTimeout(() => {
      setCurrentOrder(prev => prev ? { ...prev, status: 'ready' } : null);
    }, 10000); // Changes to "Ready" after 10 seconds
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] bg-gray-50 relative flex flex-col h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && (
            <HomeScreen 
              onSelectVendor={handleSelectVendor}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              currentOrder={currentOrder}
            />
          )}
          {activeTab === 'menu' && (
            <MenuScreen 
              vendor={selectedVendor}
              onAddToCart={handleAddToCart}
              onBack={() => setActiveTab('home')}
              cartItemsCount={cartItemsCount}
            />
          )}
          {activeTab === 'cart' && (
            <CartScreen 
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
          {activeTab === 'account' && <AccountScreen />}
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-2 py-3 shadow-lg">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Home className={`w-6 h-6 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
              <span className={`text-xs ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all duration-300 ${
                activeTab === 'menu' 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MenuIcon className={`w-6 h-6 transition-transform ${activeTab === 'menu' ? 'scale-110' : ''}`} />
              <span className={`text-xs ${activeTab === 'menu' ? 'font-bold' : 'font-medium'}`}>Menu</span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all duration-300 relative ${
                activeTab === 'cart' 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <ShoppingCart className={`w-6 h-6 transition-transform ${activeTab === 'cart' ? 'scale-110' : ''}`} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-pop">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className={`text-xs ${activeTab === 'cart' ? 'font-bold' : 'font-medium'}`}>Cart</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-xl transition-all duration-300 ${
                activeTab === 'account' 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className={`w-6 h-6 transition-transform ${activeTab === 'account' ? 'scale-110' : ''}`} />
              <span className={`text-xs ${activeTab === 'account' ? 'font-bold' : 'font-medium'}`}>Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;