import {create} from 'zustand'

interface CartItem {
  menuItemId: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item: CartItem) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}))