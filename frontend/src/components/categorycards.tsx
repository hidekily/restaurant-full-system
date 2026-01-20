import { Link } from "@tanstack/react-router"

interface CategoryCardProps{
  id:number
  nome: string
  imagemUrl?: string
}


export function CategoryCard({id, nome, imagemUrl}: CategoryCardProps) {
  return (
    <div className='h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r'>
      <img src={imagemUrl} className='text-red-500'/>
      <Link to="/menu/$categoriaId" className='text-red-500' params={{categoriaId: String(id)}}>{nome}</Link>
    </div>
  )
}
