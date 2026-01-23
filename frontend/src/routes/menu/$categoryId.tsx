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
      const res = await fetch(`http://localhost:3001/api/menu/items?categoryId=${categoryId}`)
      const data = await res.json()
      setItems(data)
    }
    fetchItems()
  }, [categoryId])

  return (
    <div className='bg-zinc-900 h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center items-center mt-[7.9%] gap-2'>
      {items.map((item) => (
        <div key={item.id} className='h-100 w-50 bg-teal-100 flex flex-col justify-center items-center'>
          <span>{item.name}</span>
          <span>R$ {item.price}</span>
        </div>
      ))}
    </div>
  )
}
