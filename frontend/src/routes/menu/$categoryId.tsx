import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/menu/$categoryId')({
  component: RouteComponent,
})

interface Item {
  id: number
  name: string
  price: string
  description?: string
  imageUrl?: string
  categoryId: number
}

function RouteComponent() {
  const { categoryId } = Route.useParams()

  const [items, setItems] = useState<Item[]>([])
  const [tableId, setTableId] = useState<String>()
  const [itemsFromSchema, setItemsFromSchema] = useState<{menuItemid: number, quantity: number}[]>([])


  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items?categoryId=${categoryId}`)
      const data = await res.json()
      setItems(data)
    }
    fetchItems()
  }, [categoryId])

  async function handleSubmitCart(e: React.FormEvent, menuItemid: number){
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const quantity = Number((form.elements[0] as HTMLInputElement).value)

    setItemsFromSchema([...itemsFromSchema, {menuItemid, quantity}])
  }

  return (
    <div className='h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center mt-[4%]'>
      {items.map((item) => (
        <div key={item.id} className='h-50 w-55 bg-zinc-900 flex flex-col justify-center items-center gap-4 rounded-2xl text-red-600'>
          <div className='flex flex-col justify-start items-center gap-2 h-[50%] w-full'>
            <span className='mt-5 font-bold text-lg'>{item.name}</span>
            <span className='text-lg font-semibold'>{item.price}</span>
          </div>
          <div className='flex flex-row gap-5 justify-center item-center'>
            <form className='flex gap-8' onSubmit={(e) => handleSubmitCart(e, item.id)}>
              <input type="number" placeholder='qnt' className='h-10 w-20 button-add-menu border-white text-600'/>
              <input type="submit" className='w-20 button-add-menu text-red-600 border-white'/>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
