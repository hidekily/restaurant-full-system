import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/console/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div className='bg-zinc-800 h-full w-full flex justify-center'>
        <section className='fixed h-[5%] w-[20%] bg-red-800 mt-4 flex justify-center items-center rounded-md text-white gap-8'>
            <Link to="/console/dashboard">Dashboard 🦥</Link>
            <Link to="/console/financa">Finanças 🦉</Link>
        </section>   

 
    </div>
  )
}
