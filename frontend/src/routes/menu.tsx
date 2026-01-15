import { createFileRoute} from '@tanstack/react-router'
import { Categoria } from '@/data/categoryInterface'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function CategoryCard({nome, imagemUrl}: Categoria) {
  return (
    <div className='h-full w-[50px] bg-zinc-900'>
      <img src={imagemUrl} alt="imagem" />
      <span>{nome}</span>
    </div>
  )
}

function RouteComponent() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() =>{
    async function fetchCategorias(){
      const response = await fetch("http://localhost3001/api/admin/categories")
      const data = await response.json()
      setCategorias(data)
    }

    fetchCategorias()
  }, [])

  return (
    <div className='bg-neutral-200 h-full w-full overflow-auto'>
      <nav className='h-[10%] w-full fixed bg-zinc-800 overflow-auto'>
        <div className="bg-emerald-900 w-[9000px] h-full">
          {categorias.map((categoria) => (
            <CategoryCard key={categoria.id} nome={categoria.nome} imagemUrl={categoria.imagemUrl} />
          ))} 
        </div>
      </nav>
    </div>  
  )
}


