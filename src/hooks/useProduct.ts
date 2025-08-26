import { useEffect, useState } from 'react';
import { useStore } from '../stores/useStore';
import { productsApi } from '../api/productsApi';
import { Product } from '../types';

export const useProduct = (id: number) => {
  const { getCachedProduct, cacheProduct } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Check cache first
      const cachedProduct = getCachedProduct(id);
      if (cachedProduct) {
        setProduct(cachedProduct);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const productData = await productsApi.getProduct(id);
        setProduct(productData);
        cacheProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getCachedProduct, cacheProduct]);

  return { product, loading, error };
};