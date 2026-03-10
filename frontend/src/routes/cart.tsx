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
        <div className='h-full w-full bg-[#F4EAE0] flex flex-col justify-center items-center gap-4'>
            <Link to="/menu" className="bg-[#4A3728] text-[#F2C56B] w-[80%] h-10 rounded-lg flex items-center justify-center font-semibold">Voltar ao Menu</Link>
            <div className='w-[80%] h-[65%] bg-[#E8D8C4] rounded-2xl flex flex-col justify-center items-center gap-4 p-4 overflow-auto border border-[#C4956A]/40 shadow-md'>
                <span className='text-[#7A5C3E] font-semibold'>Mesa: {tableId}</span>
                {items.map(item => {
                    const details = cartItems.find(ci => ci.id === item.menuItemId)
                    if(!details) return null
                    return (
                        <div key={item.menuItemId} className='grid grid-cols-[1fr_auto_auto] items-center gap-x-3 w-full bg-[#F4EAE0] rounded-2xl p-4 text-[#2C2118] border border-[#C4956A]/30'>
                            <span className='font-medium text-sm'>{details.name}</span>
                            <span className='text-[#C4956A] font-semibold text-sm whitespace-nowrap'>{`R$ ` + details.price}</span>
                            <span className='flex flex-row items-center gap-1 text-sm whitespace-nowrap'>
                                qtd: <p className='font-bold text-[#4A3728]'>{item.quantity}</p>
                            </span>
                        </div>
                    )
                })}
                <span className='text-[#4A3728] font-bold text-lg'>{`Total: R$  ` + totalPrice}</span>
            </div>
            <button className='w-[80%] h-[7%] bg-[#E8A838] text-[#2C2118] font-bold rounded-2xl shadow-md hover:bg-[#4A3728] hover:text-[#F2C56B] transition-colors active:scale-95 transition-transform' onClick={handleSubmitOrdersToOrderTab}>
                Finalizar Pedido
            </button>
        </div>
    )
}
