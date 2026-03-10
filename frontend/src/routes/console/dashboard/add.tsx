import { createFileRoute } from '@tanstack/react-router'
import {useState } from 'react'
import { API_URL } from '@/lib/api'
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Categoria } from '@/types/categoryInterface'
import { Modal } from '@/components/dashboardUI/modal'

export const Route = createFileRoute('/console/dashboard/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const [nameCategory, setNameCategory] = useState<string>("") 
  const [imageUrl, setImageUrl] = useState<string>("") 
  const [nomeItem, setNomeItem] =  useState<string>("") 
  const [preco, setPreco] = useState<string>("") 
  const [categoryId, setCategoryId] = useState<string>("")
  const [okType, setOkType] = useState<"item" | "category" | null>() 

  const queryClient = useQueryClient()

  const {data, isLoading, error} = useQuery<Categoria[]>({
    queryKey: ['categories'],
    queryFn: async() => {
      const response = await fetch(`${API_URL}/api/menu/categories`)
      return response.json()
    }
  })

  const handleCategoryMutation = useMutation({
    mutationFn: async() => {
      await fetch(`${API_URL}/api/admin/categories`, {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({name: nameCategory, imageUrl})
      })
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['categories']})
      setNameCategory("")
      setImageUrl("")
    },
    onError: () => {}
  })

  const handleItemMutation = useMutation({
    mutationFn: async() => {
      await fetch(`${API_URL}/api/admin/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({name: nomeItem, categoryId: Number(categoryId), price: preco})
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']})
      setCategoryId("")
      setNameCategory("")
      setPreco("")
    },
    onError: () => {}
  })

  if(isLoading) return <span>loading...</span>
  if(error) return <span>deu erro</span>
  if(!data) return null // ess fita aqui eh so p/ fazer o data.map n ficar com linha de erro por n conseguir identificar o type da data

  return(
    <>
      {(handleItemMutation.isSuccess || handleCategoryMutation.isSuccess) && (
        <Modal header={<div className='bolinhaModal'>❤️</div>} 
               title='Added!'
               subtitle={okType === 'category' ? "you successfully added a category" : "you successfully added an item"}
               buttons={[{text: "Confirm", 
                onclick: () =>{okType === 'category' ?  handleCategoryMutation.reset() : handleItemMutation.reset() 
                setOkType(null)},
                colorVariant: 'mid'}]}
          />
        )}
      {}

      <div className='customfont outlet-dashboard'>
        <div className='input-box'>
          <h1 className='text-green-400'>add category🐣</h1>
          <form onSubmit={(e) => {e.preventDefault(), handleCategoryMutation.mutate(), setOkType("category")}} className='input-form'>
            <input type="text" className='input-dashboard' placeholder='topic name' value={nameCategory} onChange={(e) => {setNameCategory(e.target.value)}}/>
            <input type="text" placeholder='image URL (optional)' className='input-dashboard' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}}/>
            <input type="submit" value="add" className='input-dashboard text-green-600 bg-black'/>
          </form>
        </div>

        <div className='input-box'>
          <h1 className='text-green-400'>add items 🐣</h1>
          <form onSubmit={(e) => {e.preventDefault(), handleItemMutation.mutate(), setOkType("item")}} className='input-form'>
            <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
            <input type="number" className='input-dashboard' placeholder='price' value={preco} onChange={(e) =>{setPreco(e.target.value)}}/>
            <select className='input-dashboard' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option>seletiona uma categoria</option>
              {data.map((cat) =>(
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input type="submit" value="add" className='input-dashboard text-green-600 bg-black'/>
          </form>
        </div>
      </div>
    </>
  )
}
