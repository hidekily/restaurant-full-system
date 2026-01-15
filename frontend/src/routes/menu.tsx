import { createFileRoute, Outlet} from '@tanstack/react-router'
import { Categoria } from '@/data/categoryInterface'
import { useEffect, useState} from 'react'
import { CategoryCard } from '@/components/categorycards'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() =>{
    async function fetchCategorias(){
      const response = await fetch("http://localhost:3001/api/menu/categories")
      const data = await response.json()
      setCategorias(data)
    }

    fetchCategorias()
  }, [])

  return (
    <div className='bg-neutral-200 h-full w-full overflow-auto'>
      <nav className='h-[15%] w-full fixed bg-zinc-800 overflow-auto'>
        <div className="w-auto h-full flex flex-row">
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} nome={categoria.nome} imagemUrl={categoria.imagemUrl} id={categoria.id}/>
          ))} 
        </div>
      </nav>

      <Outlet />
    </div>  
  )
}


