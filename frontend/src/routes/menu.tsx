import { createFileRoute, Outlet} from '@tanstack/react-router'
import { Categoria } from '@/data/categoryInterface'
import { useEffect, useState} from 'react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

interface CategoryCardProps{
  nome: string
  imagemUrl?: string
}


function CategoryCard({nome, imagemUrl}: CategoryCardProps) {
  return (
    <div className='h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r'>
      <img src={imagemUrl} className='text-red-500'/>
      <Link to="#" className='text-red-500'>{nome}</Link>
    </div>
  )
}

function RouteComponent() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() =>{
    async function fetchCategorias(){
      const response = await fetch("http://localhost:3001/api/admin/categories")
      const data = await response.json()
      console.log("Categorias recebidas:", data)
      setCategorias(data)
    }

    fetchCategorias()
  }, [])

  return (
    <div className='bg-neutral-200 h-full w-full overflow-auto'>
      <nav className='h-[15%] w-full fixed bg-zinc-800 overflow-auto'>
        <div className="w-auto h-full flex flex-row">
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} nome={categoria.nome} imagemUrl={categoria.imagemUrl} />
          ))} 
        </div>
      </nav>

      <Outlet />
    </div>  
  )
}


