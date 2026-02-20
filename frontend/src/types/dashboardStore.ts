import { create } from 'zustand'

interface DashboardStore {
  categoryList: { id: number; name: string }[]
  fetchCategories: () => Promise<void>
  itemList: {id: number, name: string, price: number}[]
  fetchItems: (categoryId: string) => Promise<void>
  tablesList: {id: number, number:number, area: string}[]
  fetchTables: () => Promise<void>
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  categoryList: [],
  itemList: [],
  tablesList: [],
  fetchCategories: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/categories`)
    const data = await res.json()
    set({ categoryList: data })
  },
  fetchItems: async (categoryId?: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items?categoryId=${categoryId}`)
    const data = await res.json()
    set({ itemList: data })
  },
  fetchTables: async() => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tables`, {
      credentials: "include"
    })
    const data = await res.json()
    set({ tablesList: data })
  },

}))