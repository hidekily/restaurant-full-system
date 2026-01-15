import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/menu/$categoriaId')({
  component: RouteComponent,
})

interface Item {
  id: number
  nome: string
  preco: string
  descricao?: string
  imagemUrl?: string
  categoriaId: number
}

function RouteComponent() {
  // Pegar o categoriaId da URL
  const { categoriaId } = Route.useParams()
  
  // Estado pra guardar os itens
  const [itens, setItens] = useState<Item[]>([])

  useEffect(() => {
    async function fetchItens() {
      const res = await fetch(`http://localhost:3001/api/menu/items?categoriaId=${categoriaId}`)
      const data = await res.json()
      setItens(data)
    }
    fetchItens()
  }, [categoriaId])

  return (
    <div className='bg-zinc-900 h-full w-full grid grid-cols-2 grid-rows-auto overflow-auto justify-items-center items-center mt-[7.9%] gap-2'>
      {itens.map((item) => (
        <div key={item.id} className='h-100 w-50 bg-teal-100 flex flex-col justify-center items-center'>
          <span>{item.nome}</span>
          <span>R$ {item.preco}</span>
        </div>
      ))}    
    </div>
  )
}