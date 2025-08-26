import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { useStore } from '../stores/useStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0', 10);
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      setIsAdding(true);
      addToCart(product, quantity);
      
      // Add small delay for better UX
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return <ErrorMessage message={error || 'Product not found'} />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={18} />
              </button>
              
              <span className="w-12 text-center font-medium">{quantity}</span>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 5}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-75"
            >
              <ShoppingCart size={20} />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};