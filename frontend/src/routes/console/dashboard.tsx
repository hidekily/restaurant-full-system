import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { NavbarComponent } from '@/components/dashboardUI/navbar'


export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // O Provider "coloca na mesa" os dados
      <div className='customfont bg-zinc-950 h-full w-full flex flex-col items-center'>
        <NavbarComponent um="financa 🦦" dois="pedidos 🦦" linkOne='/console/financa' linkTwo='/console/pedidos'/>

        <div className='flex flex-row w-full h-full'>
          <section className='w-[20%] bg-zinc-800 border-r-2 border-red-500 flex flex-col gap-10 p-4 items-center'>
            <Link to="/console/dashboard/add" className='w-40 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center mt-10 text-green-400'>
              Add 
            </Link>
            <Link to="/console/dashboard/del" className='w-40 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center text-red-500'>
              Delete 
            </Link>
          </section>

          <section className='w-[80%] bg-zinc-900'>
            <Outlet />
          </section>
        </div>
      </div>
  )
}