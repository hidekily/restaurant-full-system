import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { NavbarComponent } from '@/components/dashboardUI/navbar'
import { useState } from 'react'
import { TablesComponent} from '../../components/dashboardUI/tablesComponent'


export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [state, setState] = useState(true)

  return (
    // O Provider "coloca na mesa" os dados
      <div className='customfont bg-zinc-950 h-full w-full flex flex-col items-center'>
        <NavbarComponent um="financa 🦦" dois="pedidos 🦦" linkOne='/console/financa' linkTwo='/console/pedidos'/>

        <div className='flex flex-row w-full h-full'>
          <section className='w-[20%] bg-zinc-800 border-r-2 border-red-500 flex flex-col gap-7 p-4 items-center'>

            <button onClick={() => setState(true)}
                    className='w-50 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center mt-5 text-teal-600'
  
            >
              Tables
            </button>
            <Link to="/console/dashboard/add" 
                  className='w-50 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center text-green-400'
                  onClick={() => setState(false)}
            >
              Add 
            </Link>
            <Link to="/console/dashboard/del" 
                  className='w-50 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center text-red-500'
                  onClick={() => setState(false)}
            >
              Delete 
            </Link>
          </section>

          <section className='w-[80%] bg-zinc-900'> 
            {state ? <TablesComponent/> : <Outlet/>}
          </section>

        </div>
      </div>
  )
}