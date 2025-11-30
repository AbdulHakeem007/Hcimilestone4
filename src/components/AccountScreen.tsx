import React from 'react';
import { User, Edit2, LogOut, ChevronRight, Clock } from 'lucide-react';

type Order = {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'delivered' | 'pending' | 'cancelled';
};

const MOCK_USER = {
  name: 'Ahmad Khan',
  registrationNumber: '2021-CS-123',
  email: 'ahmad.khan@giki.edu.pk',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
};

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-11-20',
    items: ['Chicken Burger', 'French Fries', 'Coca Cola'],
    total: 580,
    status: 'delivered'
  },
  {
    id: 'ORD-002',
    date: '2024-11-18',
    items: ['Classic Cheese Pizza', 'Fresh Juice'],
    total: 570,
    status: 'delivered'
  },
  {
    id: 'ORD-003',
    date: '2024-11-17',
    items: ['Beef Burger', 'Chicken Wings'],
    total: 700,
    status: 'delivered'
  },
  {
    id: 'ORD-004',
    date: '2024-11-15',
    items: ['Pepperoni Pizza', 'Coca Cola x2'],
    total: 710,
    status: 'cancelled'
  }
];

export default function AccountScreen() {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 text-gray-900 px-4 py-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>My Account</h1>
          <button className="p-2.5 hover:bg-white/20 rounded-xl transition-all active:scale-95 backdrop-blur-sm">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-gray-900 mb-1 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {MOCK_USER.name}
              </h2>
              <p className="text-gray-600 text-sm mb-0.5 truncate font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                {MOCK_USER.registrationNumber}
              </p>
              <p className="text-gray-500 text-sm truncate" style={{ fontFamily: 'Lato, sans-serif' }}>
                {MOCK_USER.email}
              </p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 py-3.5 rounded-xl hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 font-bold shadow-md" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <Edit2 className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2 text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Clock className="w-6 h-6 text-amber-500" />
            Order History
          </h3>
          
          <div className="space-y-3">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-yellow-300 hover:shadow-md transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-900 mb-1 font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {order.id}
                    </p>
                    <p className="text-gray-500 text-sm font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(
                      order.status
                    )}`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {order.items.join(', ')}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. {order.total}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}