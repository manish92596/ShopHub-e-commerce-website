import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useStore } from '../../stores/useStore';

export const Header: React.FC = () => {
  const { getCartItemsCount } = useStore();
  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Store size={24} />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="md:hidden">
            <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};