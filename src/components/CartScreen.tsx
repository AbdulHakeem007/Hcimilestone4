import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartScreenProps = {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (paymentMethod: string) => void;
};

const PAYMENT_METHODS = [
  { 
    id: 'jazzcash', 
    name: 'JazzCash', 
    icon: Smartphone,
    color: 'from-red-500 to-pink-500'
  },
  { 
    id: 'easypaisa', 
    name: 'Easypaisa', 
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'card', 
    name: 'Credit/Debit Card', 
    icon: CreditCard,
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    id: 'cash', 
    name: 'Cash on Pickup', 
    icon: Banknote,
    color: 'from-amber-500 to-yellow-500'
  }
];

export default function CartScreen({ items, onUpdateQuantity, onRemoveItem, onPlaceOrder }: CartScreenProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('jazzcash');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onPlaceOrder(selectedPayment);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full animate-pop">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-gray-900 text-2xl mb-3 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Order Placed!
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
            Your order is being prepared. You'll be redirected to track your order.
          </p>
          <div className="animate-pulse">
            <div className="h-2 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout && items.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-gray-900 px-4 py-5 shadow-lg">
          <h1 className="text-center text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Checkout
          </h1>
        </div>

        <div className="p-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
            <h3 className="text-gray-900 mb-4 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-4 pb-4 border-b-2 border-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900 font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span style={{ fontFamily: 'Lato, sans-serif' }}>Subtotal</span>
                <span className="font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span style={{ fontFamily: 'Lato, sans-serif' }}>Delivery Fee</span>
                <span className="font-semibold text-green-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Pickup
                </span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-gray-900">
                  <span className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Total</span>
                  <span className="font-bold text-xl text-amber-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. {total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
            <h3 className="text-gray-900 mb-4 text-xl flex items-center gap-2 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <CreditCard className="w-6 h-6 text-amber-500" />
              Payment Method
            </h3>
            
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                      selectedPayment === method.id
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-900 font-bold text-lg flex-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {method.name}
                    </span>
                    {selectedPayment === method.id && (
                      <CheckCircle className="w-6 h-6 text-amber-600 animate-pop" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Place Order Button */}
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 py-4 rounded-xl hover:shadow-xl transition-all active:scale-98 font-bold text-lg shadow-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Place Order - Rs. {total}
          </button>

          <button 
            onClick={() => setShowCheckout(false)}
            className="w-full mt-3 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-98 font-semibold shadow-sm"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-gray-900 px-4 py-5 shadow-lg">
        <h1 className="text-center text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Shopping Cart
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mb-5">
            <ShoppingBag className="w-12 h-12 text-amber-500" />
          </div>
          <h2 className="text-gray-700 text-center mb-2 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-center leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
            Add items from the menu to get started
          </p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0 shadow-sm"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 font-bold truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm truncate" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {item.vendorName}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg active:scale-95 flex-shrink-0 ml-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Rs. {item.price * item.quantity}
                    </span>
                    
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors active:scale-95 shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-gray-900 font-bold min-w-[24px] text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors active:scale-95 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="px-4 pb-4">
            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h3 className="text-gray-900 mb-4 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Order Total
              </h3>
              
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: 'Lato, sans-serif' }}>Subtotal</span>
                  <span className="font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span style={{ fontFamily: 'Lato, sans-serif' }}>Delivery Fee</span>
                  <span className="font-semibold text-green-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>Pickup</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-gray-900">
                    <span className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Total</span>
                    <span className="font-bold text-xl text-amber-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Rs. {total}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 py-4 rounded-xl hover:shadow-xl transition-all active:scale-98 font-bold text-lg shadow-lg"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
