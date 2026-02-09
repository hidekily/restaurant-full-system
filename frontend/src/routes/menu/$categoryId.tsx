import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/types/useCartStore'

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
  const { addItem } = useCartStore()

  const [items, setItems] = useState<Item[]>([])
  const [itemsQuantity, setItemsQuantity] = useState<Record<number, number>>({})

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items?categoryId=${categoryId}`)
      const data = await res.json()
      setItems(data)
    }
    fetchItems()
  }, [categoryId])

  function handleIncrease(itemId: number) {
    const currentQty = itemsQuantity[itemId] || 0
    setItemsQuantity({ ...itemsQuantity, [itemId]: currentQty + 1 })
  }

  function handleDecrease(itemId: number) {
    const currentQty = itemsQuantity[itemId] || 0
    if (currentQty > 0) {
      setItemsQuantity({ ...itemsQuantity, [itemId]: currentQty - 1 })
    }
  }

  function handleAddAllToCart() {
    Object.entries(itemsQuantity).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        addItem({ menuItemId: Number(itemId), quantity })
      }
    })
    setItemsQuantity({}) // reseta as quantidades locais
  }

  const totalItems = Object.values(itemsQuantity).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className='h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center mt-[4%] pb-24'>
      {items.map((item) => (
        <div key={item.id} className='h-50 w-55 bg-zinc-900 flex flex-col justify-center items-center gap-4 rounded-2xl text-red-600'>
          <div className='flex flex-col justify-start items-center gap-2 h-[50%] w-full'>
            <span className='mt-5 font-bold text-lg'>{item.name}</span>
            <span className='text-lg font-semibold'>{item.price}</span>
          </div>
          <div className='flex flex-row gap-5 justify-center items-center'>
            <button onClick={() => handleDecrease(item.id)} className='h-10 w-10 bg-zinc-700 rounded-full text-white text-xl'>-</button>
            <span className='text-lg font-bold'>{itemsQuantity[item.id] || 0}</span>
            <button onClick={() => handleIncrease(item.id)} className='h-10 w-10 bg-zinc-700 rounded-full text-white text-xl'>+</button>
          </div>
        </div>
      ))}

      {totalItems > 0 && (
        <button
          onClick={handleAddAllToCart}
          className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg z-50'
        >
          Adicionar {totalItems} ao carrinho
        </button>
      )}
    </div>
  )
}