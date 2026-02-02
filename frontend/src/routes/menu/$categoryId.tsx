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
  // Pegar o categoryId da URL
  const { categoryId } = Route.useParams()

  // Estado pra guardar os itens
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items?categoryId=${categoryId}`)
      const data = await res.json()
      setItems(data)
    }
    fetchItems()
  }, [categoryId])

  return (
    <div className='h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center mt-[4%]'>
      {items.map((item) => (
        <div key={item.id} className='h-50 w-50 bg-teal-100 flex flex-col justify-center items-center gap-4 rounded-2xl'>
          <span>{item.name}</span>
          <span>R$ {item.price}</span>
        </div>
      ))}
    </div>
  )
}
