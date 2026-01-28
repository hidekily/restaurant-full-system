import { Link } from "@tanstack/react-router"

interface CategoryCardProps{
  id:number
  name: string
  imageUrl?: string
}


export function CategoryCard({id, name, imageUrl}: CategoryCardProps) {
  return (
      <Link to="/menu/$categoryId" 
            className='h-full w-[100px] bg-zinc-800 flex flex-col justify-center items-center text-white border-l border-r' 
            params={{categoryId: String(id)}}
      >
        {imageUrl && <img src={imageUrl} alt={name} className="w-[80%] h-[60%] object-cover mb-2 rounded-lg"/>}
        <span className="text-white text-sm mt-2">{name}</span>
      </Link>
  )
}
