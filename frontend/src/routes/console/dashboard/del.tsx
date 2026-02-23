import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ConfirmModal } from '@/components/confirmModal'
import { useDashboardStore } from '@/types/dashboardStore'
import { API_URL } from '@/lib/api'

export const Route = createFileRoute('/console/dashboard/del')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryList, fetchCategories, itemList, fetchItems } = useDashboardStore()

  const [categoryId, setCategoryId] = useState<string>("")
  const [itemId, setItemId] = useState<string>("")
  const [deletingType, setDeletingType] = useState<"category" | "item" | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])


  async function handleDeleteCategory() {
    await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      credentials: "include",
    })
    fetchCategories()
    setDeletingType(null)
    setCategoryId("")
  }

  async function handleDeleteItem() {
    await fetch(`${API_URL}/api/admin/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    })
    fetchCategories()
    setDeletingType(null)
    setCategoryId("")
  }

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
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input type="submit" value="delete" className="input-dashboard text-red-500 bg-black" />
          </form>
        </div>

        <div className="input-box">
          <h1 className='text-red-800'>delete item 🗑️</h1>
          <form className="input-form" onSubmit={(e) => { e.preventDefault(); setDeletingType("item") }}>
            <select className="input-dashboard" onChange={(e) => fetchItems(e.target.value)}>
              <option>Selecione a categoria</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select className="input-dashboard" value={itemId} onChange={(e) => setItemId(e.target.value)}>
              <option>Selecione um item</option>
              {itemList.map((item) => (
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
