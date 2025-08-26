import { useEffect } from 'react';
import { useStore } from '../stores/useStore';
import { productsApi } from '../api/productsApi';

export const useProducts = () => {
  const {
    products,
    categories,
    loading,
    error,
    searchTerm,
    selectedCategory,
    setProducts,
    setCategories,
    setLoading,
    setError,
  } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getAllProducts(),
          productsApi.getCategories(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchData();
    }
  }, [products.length, setProducts, setCategories, setLoading, setError]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    selectedCategory,
  };
};