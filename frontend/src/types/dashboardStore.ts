import { create } from 'zustand'

interface DashboardStore {
  categoryList: { id: number; name: string }[]
  fetchCategories: () => Promise<void>
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  categoryList: [],
  
  fetchCategories: async () => {
    const res = await fetch("http://localhost:3001/api/menu/categories")
    const data = await res.json()
    set({ categoryList: data })
  }
}))