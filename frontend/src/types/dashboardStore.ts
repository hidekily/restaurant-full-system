import { create } from 'zustand'

interface DashboardStore {
  categoryList: { id: number; name: string }[]
  fetchCategories: () => Promise<void>
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  categoryList: [],
  
  fetchCategories: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/categories`)
    const data = await res.json()
    set({ categoryList: data })
  }
}))