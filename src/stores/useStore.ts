import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Product, CartItem } from '../types';

interface StoreActions {
  setProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cacheProduct: (product: Product) => void;
  getCachedProduct: (id: number) => Product | undefined;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

type Store = AppState & StoreActions;

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      categories: [],
      cart: [],
      loading: false,
      error: null,
      searchTerm: '',
      selectedCategory: '',
      cachedProducts: {},

      // Actions
      setProducts: (products) => set({ products }),
      setCategories: (categories) => set({ categories }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
                  : item
              ),
            };
          }
          
          return {
            cart: [...state.cart, { id: product.id, product, quantity }],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      cacheProduct: (product) =>
        set((state) => ({
          cachedProducts: { ...state.cachedProducts, [product.id]: product },
        })),

      getCachedProduct: (id) => get().cachedProducts[id],

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getCartItemsCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'ecommerce-storage',
      partialize: (state) => ({
        cart: state.cart,
        cachedProducts: state.cachedProducts,
      }),
    }
  )
);