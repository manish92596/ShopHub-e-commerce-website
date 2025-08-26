

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