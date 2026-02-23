import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useDashboardStore } from '@/types/dashboardStore'
import { API_URL } from '@/lib/api'

export const Route = createFileRoute('/console/dashboard/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryList, fetchCategories, itemList, fetchItems } = useDashboardStore()

  const [nameCategory, setNameCategory] = useState<string>("") // this one sets category name in the input
  const [imageUrl, setImageUrl] = useState<string>("") // this one sets image url in the input
  const [nomeItem, setNomeItem] =  useState<string>("") // this one sets item name in the input
  const [preco, setPreco] = useState<string>("") // this one sets item price in the input
  const [categoryId, setCategoryId] = useState<string>("") // this one sets category id in the input for item creation


  useEffect(() =>{
    fetchCategories()
  }, [])


  async function handleSubmitItem(e: React.FormEvent){
    e.preventDefault()

    const storeDataItem = await fetch(`${API_URL}/api/admin/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({name: nomeItem, categoryId: Number(categoryId), price: preco})
    })

    setCategoryId("")
    setNameCategory("")
    setPreco("")
    fetchCategories()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

  const storeDataCategory = await
     fetch(`${API_URL}/api/admin/categories`, {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({name: nameCategory, imageUrl})
  })

  setNameCategory("")
  setImageUrl("")
  fetchCategories()
  }

  return(
    <div className='customfont outlet-dashboard'>
      <div className='input-box'>
        <h1 className='text-green-400'>add category🐣</h1>
        <form onSubmit={handleSubmit} className='input-form'>
          <input type="text" className='input-dashboard' placeholder='topic name' value={nameCategory} onChange={(e) => {setNameCategory(e.target.value)}}/>
          <input type="text" placeholder='image URL (optional)' className='input-dashboard' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}}/>
          <input type="submit" value="add" className='input-dashboard text-green-600 bg-black'/>
        </form>
      </div>

      <div className='input-box'>
        <h1 className='text-green-400'>add items 🐣</h1>
        <form onSubmit={handleSubmitItem} className='input-form'>
          <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
          <input type="number" className='input-dashboard' placeholder='price' value={preco} onChange={(e) =>{setPreco(e.target.value)}}/>
          <select className='input-dashboard' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option>seletiona uma categoria</option>
            {categoryList.map((cat) =>(
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input type="submit" value="add" className='input-dashboard text-green-600 bg-black'/>
        </form>
      </div>
    </div>
  )
}
