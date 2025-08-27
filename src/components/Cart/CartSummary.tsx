import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/useStore';

export const CartSummary: React.FC = () => {
  const { cart, getCartTotal } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cart.length} items)</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};