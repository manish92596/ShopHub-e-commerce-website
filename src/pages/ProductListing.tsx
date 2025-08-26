
export const ProductListing: React.FC = () => {
  const { products, categories, loading, error } = useProducts();

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Discover our curated collection of quality products</p>
      </div>

      <ProductFilters categories={categories} />
      <ProductGrid products={products} />
    </div>
  );
};




export const Cart: React.FC = () => {
  const { cart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Items in Cart ({cart.length})
            </h2>
            <div className="space-y-0">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};


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


