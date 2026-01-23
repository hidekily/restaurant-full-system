import { Link } from "@tanstack/react-router"

interface CategoryCardProps{
  id:number
  name: string
  imageUrl?: string
}


export function CategoryCard({id, name, imageUrl}: CategoryCardProps) {
  return (
    <div className='h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r'>
      {imageUrl && <img src={imageUrl} className="w-50 h-50 rounded-lg border text-red-700"/>}
      <Link to="/menu/$categoryId" className='text-red-500' params={{categoryId: String(id)}}>{name}</Link>
    </div>
  )
}
