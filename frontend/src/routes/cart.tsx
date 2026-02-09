import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '@/types/useCartStore'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
    const { items } = useCartStore()
    return (
        <div className='h-screen w-full bg-zinc-700'>
            <div className='text-white text-center'>
                <h1 className='text-2xl font-bold'>Carrinho de Compras</h1>
                <p className='mt-4'>Itens no carrinho: {items.length}</p>
            </div>
        </div>
    )
}
