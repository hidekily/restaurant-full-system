import {create} from 'zustand'

interface CartItem {
  menuItemId: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  clearCart: () => void
  tableId: string
  setTableId: (tableId: string) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  tableId: "",
  clearCart: () => set({ items: [] }),
  setTableId: (tableId: string) => set((state) => ({ tableId: tableId})),

    addItem: (item: CartItem) => set((state) => {
      const res = state.items.findIndex((comparing) => comparing.menuItemId === item.menuItemId)
      
      return res === - 1 ? 
       {items: [...state.items, item]} 
       :
       {items: state.items.map((comparing) => 
          comparing.menuItemId === item.menuItemId ? {
            ...comparing, quantity: comparing.quantity + 1
        } : comparing 
      )}
    })

    }
  )
)
