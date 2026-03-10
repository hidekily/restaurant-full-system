import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/types/useCartStore'
import { API_URL } from '@/lib/api'

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
      const res = await fetch(`${API_URL}/api/menu/items?categoryId=${categoryId}`)
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
    <div className='h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center mt-[4%] pb-24 gap-4 px-3 bg-[#F4EAE0]'>
      {items.map((item) => (
        <div key={item.id} className='h-55 w-45 bg-[#E8D8C4] flex flex-col justify-center items-center gap-4 rounded-2xl text-[#7A5C3E] shadow-md border border-[#C4956A]/30'>
          <div className='flex flex-col justify-center items-center gap-3 h-[60%] w-full text-center p-1'>
            <span className='mt-5 font-bold text-sm text-[#2C2118] tracking-wide leading-tight'>{item.name}</span>
            <span className='text-base font-bold text-[#C4956A]'>{item.price}</span>
          </div>
          <div className='flex flex-row gap-5 justify-center items-center'>
            <button onClick={() => handleDecrease(item.id)} className='h-10 w-10 bg-[#E8828A] rounded-full text-white text-xl font-bold shadow-sm active:scale-95 transition-transform'>-</button>
            <span className='text-lg font-bold text-[#4A3728] w-5 text-center'>{itemsQuantity[item.id] || 0}</span>
            <button onClick={() => handleIncrease(item.id)} className='h-10 w-10 bg-[#3A7D32] rounded-full text-white text-xl font-bold shadow-sm active:scale-95 transition-transform'>+</button>
          </div>
        </div>
      ))}

      {totalItems >= 0 && (
        <button
          onClick={handleAddAllToCart}
          className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#4A3728] text-[#F2C56B] px-8 py-4 rounded-full text-lg font-bold shadow-xl z-50 border border-[#E8A838]/40 active:scale-95 transition-transform'
        >
          Adicionar {totalItems} ao carrinho
        </button>
      )}
    </div>
  )
}