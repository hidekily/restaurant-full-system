import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { NavbarComponent } from '@/components/dashboardUI/navbar'

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // O Provider "coloca na mesa" os dados
      <div className='bg-[#E8D8C4] h-full w-full flex flex-col items-center'>
        <NavbarComponent um="financa 🦦" dois="pedidos 🦦" linkOne='/console/financa' linkTwo='/console/pedidos'/>

        <div className='flex flex-row w-full h-full'>
          <section className='w-[20%] bg-[#F4EAE0]/50 border-r-2 border-[#C4956A] flex flex-col gap-7 p-4 items-center'>
            <Link to="/console/dashboard"
                    className='w-full h-15 bg-[#C4956A] rounded-2xl flex text-md justify-center items-center mt-5 text-teal-600
                               tablesImg'
            />

            <Link to="/console/dashboard/add" 
                  className='w-full h-15 bg-[#C4956A] rounded-2xl flex text-md justify-center items-center text-green-400
                             addImg'
            />

            <Link to="/console/dashboard/del" 
                  className='w-full h-15 bg-[#C4956A] rounded-2xl flex text-md justify-center items-center text-red-500
                             delImg'
            />
          </section>

          <section className='w-[80%] bg-[#F4EAE0]'>
            <Outlet />
          </section>

        </div>
      </div>
  )
}