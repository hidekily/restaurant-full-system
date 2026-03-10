import { createFileRoute } from '@tanstack/react-router'
import {useState } from 'react'
import { API_URL } from '@/lib/api'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { Categoria } from '@/types/categoryInterface'
import { Modal } from '@/components/dashboardUI/modal'

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

  const handleDeleteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${API_URL}/api/admin/categories/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
      }) 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']})
    },
    onError: () => {},
  })

  const handleDeleteMutationItem = useMutation({
    mutationFn: async() =>{
      await fetch(`${API_URL}/api/admin/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['items']})
    }

  })

  const getCategory = categoryData?.find(ci => ci.id === Number(categoryId))
  const getItem = itemData?.find(ci => ci.id === Number(itemId))

  if(!categoryData) return null

  return (
    <>
      {deletingType && !handleDeleteMutationItem.isSuccess && !handleDeleteMutation.isSuccess && (
        <Modal header={<div className='bolinhaModal'>🗑️</div>} 
        title={`delete this ${deletingType === "category" ? "category?" : "item?"}`}
        subtitle={<>
          You will remove this: {deletingType === 'category' 
          ? <span className='text-red-500'>"{getCategory?.name}"</span> 
          : <span className='text-red-500'>"{getItem?.name}"</span>
          } , are you sure?
        </>} 
        buttons={[
          {text: "Cancel", 
            onclick: () => deletingType === 'category' ? (handleDeleteMutation.reset(), setDeletingType(null)) :  (handleDeleteMutationItem.reset(), setDeletingType(null)),
            colorVariant: "mid" },
          {text: "Delete", 
            onclick: () => deletingType === 'category' ? handleDeleteMutation.mutate() : handleDeleteMutationItem.mutate(),
            colorVariant: "danger" 
          }  
        ]} />
      )}    

      {(handleDeleteMutation.isSuccess || handleDeleteMutationItem.isSuccess) && (
        <Modal header={<div className='bolinhaModal'>✔️</div>} 
        title="Deleted!"
        subtitle='your action was successfully made, you can now exit this message' 
        buttons={[
          {text: "Continue", onclick: () => {setDeletingType(null), handleDeleteMutation.reset()}, colorVariant: "mid" },
        ]} />
      )}

      {(handleDeleteMutation.isError || handleDeleteMutationItem.isError) && (
        <Modal header={<div className='bolinhaModal'>❌</div>} 
        title="Something went wrong!" 
        subtitle="..." 
        buttons={[
          { text: "Cancel", onclick: () => console.log("cancel"), colorVariant: "mid" },
          {text: "Delete", onclick: () => console.log("delete"), colorVariant: "danger" }
        ]} />
      )}

      {/* fim dos modais PQP */}

      <div className="outlet-dashboard">
        <div className="input-box">
          <h1 className='text-[#7A5C3E] customfont2'>delete category 🗑️</h1>
          <form className="input-form" onSubmit={(e) => { e.preventDefault(); setDeletingType("category") }}>
            <select className="input-dashboard" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option>Selecione uma categoria</option>
              {categoryData && categoryData.map && categoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input type="submit" value="delete" className="input-dashboard text-red-500 bg-[#F2C56B]" />
          </form>
        </div>

        <div className="input-box">
          <h1 className='text-[#7A5C3E] customfont2'>delete item 🗑️</h1>
          <form className="input-form" onSubmit={(e) => { e.preventDefault(); setDeletingType("item")}}>
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
            <input type="submit" value="delete" className="input-dashboard text-red-500 bg-[#F2C56B]" />
          </form>
        </div>
      </div>
    </>
  )
}
