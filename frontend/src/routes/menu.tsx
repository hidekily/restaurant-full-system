import { createFileRoute, Link, Outlet} from '@tanstack/react-router'
import { CategoryCard } from '@/components/categorycards'
import {z} from 'zod'
import { API_URL } from '@/lib/api'
import { useQuery} from '@tanstack/react-query'
import { Categoria } from '@/types/categoryInterface'
import { useCartStore } from '@/types/useCartStore'
import { useSearch} from '@tanstack/react-router'
import { useEffect } from 'react'

const validateSearchParams = z.object({
  tableId: z.union([z.string(), z.number()]).transform(String).optional()
})

export const Route = createFileRoute('/menu')({
  validateSearch: validateSearchParams,
  component: RouteComponent,  
})

function RouteComponent() {
  const { setTableId } = useCartStore()
  const search = useSearch({from: '/menu'})


  const {data} = useQuery<Categoria[]>({
    queryKey: ['categories'],
    queryFn: async() => {
      const response = await fetch(`${API_URL}/api/menu/categories`)
      return response.json()
    }
  })

  useEffect(() => {
    if(search.tableId) {
      setTableId(String(search.tableId))
    }
  }, [search.tableId, setTableId])

  if(!data) return null

  return (
    // div da pagina como um todo
    <div className='bg-zinc-700 h-full w-full overflow-auto'>
      <nav className='h-[15%] w-full bg-zinc-800 overflow-auto border-b-1 text-white'>
        <div className="w-auto h-full flex flex-row">
          <Link to="/cart" className="carrinho h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r">
          </Link>
          {data.map((category) => (
            <CategoryCard key={category.id} name={category.name} imageUrl={category.imageUrl} id={category.id}/>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
