import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useStore } from '../../stores/useStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-16 h-16 object-contain rounded-lg bg-gray-100"
      />

      <div className="flex-1">
        <Link
          to={`/product/${item.product.id}`}
          className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          {item.product.title}
        </Link>
        <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= 10}
          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};