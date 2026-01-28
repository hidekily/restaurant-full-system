import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ConfirmModal } from '@/components/confirmModal'
import { useDashboardStore } from '@/types/dashboardStore'


export const Route = createFileRoute('/console/dashboard/del')({
  component: RouteComponent,
})

function RouteComponent() {
    const { categoryList, fetchCategories } = useDashboardStore()

    const [categoryId, setCategoryId] = useState<string>("") // this one sets category id in the input for item creation
    const [itemId, setItemId] =  useState<string>("") // this one sets item name in the input
    const [deletingType, setDeletingType] = useState<"category" | "item" | null>(null)
    const [itemList, setItemList] = useState<any[]>([])
  
    useEffect(() =>{
      fetchCategories()
    }, [])

    async function fetchItems(categoryId: string) {
      const res = await fetch(`http://localhost:3001/api/menu/items?categoryId=${categoryId}`)
      const data = await res.json()
      setItemList(data)
    }

  
  async function handleDeleteCategory(){
    const res = await fetch(`http://localhost:3001/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      credentials: "include"
    })
    fetchCategories()
    setDeletingType(null)
    setCategoryId("")
  }

  async function handleDeleteItem(){
    const res = await fetch(`http://localhost:3001/api/admin/items/${itemId}`, {
      method: "DELETE",
      credentials: "include"
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

      <div className='outlet-dashboard'>
        <div className='input-box'>
          <h1>delete category 🗑️</h1>
          <form className='input-form' onSubmit={(e) => {
            e.preventDefault()
            setDeletingType("category")
          }}>
            <input type="text" className='input-dashboard' placeholder='category id' value={categoryId} onChange={(e) =>{setCategoryId(e.target.value)}}/>
            <input type="submit" value="delete" className='input-dashboard text-red-500'/>
          </form>
        </div>

        <div className='input-box'>
          <h1>delete item 🗑️</h1>
          <form className='input-form' onSubmit={(e) => {
            e.preventDefault()
            setDeletingType("item")
          }}>
            <input type="text" className='input-dashboard' placeholder='item id' value={itemId} onChange={(e) =>{setItemId(e.target.value)}}/>
            <input type="text" className='input-dashboard' placeholder='category id' value={categoryId} onChange={(e) =>{setCategoryId(e.target.value)}}/>
            <input type="submit" value="delete" className='input-dashboard text-red-500'/>
          </form>
        </div>
      </div>
    </>
  )
}
