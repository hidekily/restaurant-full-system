import { createFileRoute, Outlet} from '@tanstack/react-router'
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
    <div className='bg-zinc-700 h-full w-full overflow-auto'>
      <nav className='h-[15%] w-full bg-zinc-800 overflow-auto border-b-1 text-white'>
        <div className="w-auto h-full flex flex-row">
          {categories.map((category) => (
            <CategoryCard key={category.id} name={category.name} imageUrl={category.imageUrl} id={category.id}/>
          ))}
        </div>
      </nav>

      <Outlet />
    </div>
  )
}
