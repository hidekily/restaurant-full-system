import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '@/types/useCartStore'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { API_URL } from '@/lib/api'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
    const { items, tableId, clearCart } = useCartStore()
    const [cartItems, setCartItems] = useState<any[]>([])

    async function fetchCartItems() {
        const res = await fetch(`${API_URL}/api/menu/items/by-ids?ids=${items.map(item => item.menuItemId).join(',')}`)
        const data = await res.json()
        setCartItems(data)
    }
    
    async function handleSubmitOrdersToOrderTab(){
        const handleResponse = await fetch(`${API_URL}/api/menu/clientorders`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({table: Number(tableId), items})
        })

        if(handleResponse.ok){
            clearCart()
            window.alert("order confirmed!")
        }
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
            <Link to="/menu" className="bg-zinc-600 text-black w-[80%] h-10 rounded-lg flex items-center justify-center">Voltar ao Menu</Link>
            <div className='w-[80%] h-[65%] bg-zinc-700 rounded-2xl flex flex-col justify-center items-center gap-4 p-4 overflow-auto'>
                <span>table: {tableId}</span>
                {items.map(item => {
                    const details = cartItems.find(ci => ci.id === item.menuItemId)
                    if(!details) return null
                    return (
                        <div key={item.menuItemId} className='grid grid-cols-3 justify-items-center w-full bg-zinc-600 rounded-2xl p-4 text-white'>
                            <span>
                                {`Item: ` + details.name}
                            </span>
                            <span>
                                {`Price: ` + details.price}
                            </span>
                            <span className='flex flex-row items-center justify-center gap-2'>
                                quantity :
                                <p className='text-black'>{item.quantity}</p>
                            </span>
                        </div>
                    )
                })}
                <span>{`Total: R$  ` + totalPrice}</span>
            </div>
            <button className='w-[80%] h-[7%] bg-zinc-600 rounded-2xl' onClick={handleSubmitOrdersToOrderTab}>
                Finalizar Pedido
            </button>
        </div>
    )
}
