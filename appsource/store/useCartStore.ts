import { create } from 'zustand';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  wishListItems: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  setItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getProductFromCart: (productId: number) => CartItem | undefined;
  addProductToWishlist: (product: Product) => void;
  getStatusOfLikedProducts: (product: number) => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  wishListItems: [],

  addToCart: (product, quantity = 1) =>
    set(state => {
      const existingItem = state.cartItems.find(item => item.id === product.id);

      if (existingItem) {
        return {
          cartItems: state.cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity }],
      };
    }),

  addProductToWishlist: product =>
    set(state => {
      const existingItem = state.wishListItems.find(
        item => item.id === product.id,
      );
      if (existingItem) {
        return {
          wishListItems: state.wishListItems.filter(
            item => item.id !== existingItem.id,
          ),
        };
      }
      return {
        wishListItems: [...state.wishListItems, product],
      };
    }),

  getProductFromCart: productId => {
    return get().cartItems.find(item => item.id === productId);
  },

  getStatusOfLikedProducts: productId => {
    return get().wishListItems.findIndex(item => item.id == productId);
  },

  removeFromCart: productId =>
    set(state => ({
      cartItems: state.cartItems.filter(item => item.id !== productId),
    })),

  setItemQuantity: (productId, quantity) =>
    set(state => {
      if (quantity <= 0) {
        return {
          cartItems: state.cartItems.filter(item => item.id !== productId),
        };
      }

      return {
        cartItems: state.cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      };
    }),

  clearCart: () => set({ cartItems: [] }),

  getCartItemCount: () => get().cartItems.length,

  getCartTotal: () =>
    get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
}));

export default useCartStore;
