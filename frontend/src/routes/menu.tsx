import { createFileRoute, Link, Outlet} from '@tanstack/react-router'
import { Categoria } from '@/types/categoryInterface'
import { useEffect, useState} from 'react'
import { CategoryCard } from '@/components/categorycards'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  const [categories, setCategories] = useState<Categoria[]>([])

  useEffect(() =>{
    async function fetchCategorias(){
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/categories`)
      const data = await response.json()
      setCategories(data)
    }

    fetchCategorias()
  }, [])

  return (
    // modal
    

    // div da pagina como um todo
    <div className='bg-zinc-700 h-full w-full overflow-auto'>
      <nav className='h-[15%] w-full bg-zinc-800 overflow-auto border-b-1 text-white'>
        <div className="w-auto h-full flex flex-row">
          <Link to="/cart" className="carrinho h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r">
          </Link>
          {categories.map((category) => (
            <CategoryCard key={category.id} name={category.name} imageUrl={category.imageUrl} id={category.id}/>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
