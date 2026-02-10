import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '@/types/useCartStore'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
    const { items } = useCartStore()
    const [cartItems, setCartItems] = useState<any[]>([])

    async function fetchCartItems() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}api/menu/items/by-ids?ids=${items.map(item => item.menuItemId).join(',')}`)
        const data = await res.json()
        setCartItems(data)
    }

    useEffect(() => {
        if (items.length > 0) {
            fetchCartItems()
        }
    }, [])

    return (
        <div className='h-full w-full bg-zinc-800 flex flex-col justify-center items-center'>
            {items.map(item => {
                const details = cartItems.find(ci => ci.id === item.menuItemId)
                if(!details) return null
                return (
                    <div key={item.menuItemId} className=''>
                      <span>{details.price}</span>
                    </div>
                )
            })}
        </div>
    )
}
