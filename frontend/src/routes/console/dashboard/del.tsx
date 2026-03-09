import { createFileRoute } from '@tanstack/react-router'
import {useState } from 'react'
import { API_URL } from '@/lib/api'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { Categoria } from '@/types/categoryInterface'
import { ConfirmModal } from '@/components/confirmModal'

export const Route = createFileRoute('/console/dashboard/del')({
  component: RouteComponent,
})

function RouteComponent() {
  const [categoryId, setCategoryId] = useState<string>("")
  const [itemId, setItemId] = useState<string>("")
  const [deletingType, setDeletingType] = useState<"category" | "item" | null>(null)

  const queryClient = useQueryClient()

  const {data: categoryData, isLoading: categoryLoading, error: categoryError} = useQuery<Categoria[]>({
    queryKey: ['categories'],
    queryFn: async() => {
      const response = await fetch(`${API_URL}/api/admin/categories`, {
        credentials: 'include'
      })
      return response.json()
    }
  })
  
  const {data: itemData, isLoading: itemLoading, error: itemError} = useQuery<{id: number, name: string, price: string}[]>({
    queryKey: ['items', categoryId],
    queryFn: async() => {
      const response = await fetch(`${API_URL}/api/menu/items?categoryId=${categoryId}`)
      return response.json()
    },
    enabled: !!categoryId
  })

  async function handleDeleteCategory() {
    await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      credentials: "include",
    })
    setDeletingType(null)
    setCategoryId("")
    queryClient.invalidateQueries({queryKey: ['categories']})
  }

  async function handleDeleteItem() {
    await fetch(`${API_URL}/api/admin/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    })
    setDeletingType(null)
    setCategoryId("")
    queryClient.invalidateQueries({queryKey: ['categories', categoryId]})

  }

  if(!categoryData) return null

  return (
    <>
      <ConfirmModal
        isOpen={deletingType !== null}
        title={`Delete this ${deletingType}? ID: ${deletingType === "category" ? categoryId : itemId}`}
        onConfirm={deletingType === "category" ? handleDeleteCategory : handleDeleteItem}
        onCancel={() => setDeletingType(null)}
      />

      <div className="outlet-dashboard">
        <div className="input-box">
          <h1 className='text-red-800'>delete category 🗑️</h1>
          <form className="input-form" onSubmit={(e) => { e.preventDefault(); setDeletingType("category") }}>
            <select className="input-dashboard" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option>Selecione uma categoria</option>
              {categoryData && categoryData.map && categoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input type="submit" value="delete" className="input-dashboard text-red-500 bg-black" />
          </form>
        </div>

        <div className="input-box">
          <h1 className='text-red-800'>delete item 🗑️</h1>
          <form className="input-form" onSubmit={(e) => { e.preventDefault(); setDeletingType("item") }}>
            <select className="input-dashboard" onChange={(e) => setCategoryId(e.target.value)}>
              <option>Selecione a categoria</option>
              {categoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select className="input-dashboard" value={itemId} onChange={(e) => setItemId(e.target.value)}>
              <option>Selecione um item</option>
              {(itemData ?? []).map((item) => (
                <option key={item.id} value={item.id}>{item.name} - R${item.price}</option>
              ))}
            </select>
            <input type="submit" value="delete" className="input-dashboard text-red-500 bg-black" />
          </form>
        </div>
      </div>
    </>
  )
}
