import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '@/types/useCartStore'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
    const { items, tableId } = useCartStore()
    const [cartItems, setCartItems] = useState<any[]>([])


    async function fetchCartItems() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/items/by-ids?ids=${items.map(item => item.menuItemId).join(',')}`)
        const data = await res.json()
        setCartItems(data)
    }

    useEffect(() => {
        if (items.length > 0) {
            fetchCartItems()
        }
    }, [])

    const totalPrice = items.reduce((index, item) => {
        const details = cartItems.find(ci => ci.id === item.menuItemId)
        
        if(!details){return index}

        return(
            index + (details.price * item.quantity)
        )
    }, 0)

    return (
        <div className='h-full w-full bg-zinc-800 flex flex-col justify-center items-center gap-4'>
            <Link to="/menu" className="text-white">Voltar ao Menu</Link>
            <div className='w-[80%] h-[65%] bg-zinc-700 rounded-2xl flex flex-col justify-start items-center gap-4 p-4'>
                <span>{tableId}</span>
                {items.map(item => {
                    const details = cartItems.find(ci => ci.id === item.menuItemId)
                    if(!details) return null
                    return (
                        <div key={item.menuItemId} className='flex justify-between items-center w-full bg-zinc-600 rounded-2xl p-4 text-white'>
                         <span>{details.name}</span>
                         <span>{details.price}</span>
                        <span>{item.quantity}</span>
                        </div>
                    )
                })}
                <span>{totalPrice}</span>
            </div>
            <button className='w-[80%] h-[7%] bg-zinc-600 rounded-2xl'>
                Finalizar Pedido
            </button>
        </div>
    )
}
