import Example from '@/components/recharts'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FinanceContainer } from '@/components/financeContainer'
import { NavbarComponent } from '@/components/dashboardUI/navbar';

export const Route = createFileRoute('/console/financa')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex flex-col items-center'>
        <NavbarComponent um="dashboard 🦦" dois="pedidos 🦦" linkOne='/console/dashboard' linkTwo='/console/pedidos'/>

        <section className='h-[80%] w-full  flex flex-row'>
          <div className='w-[40%] h-full flex flex-col gap-5 justify-center items-center'>
            <FinanceContainer />
            <FinanceContainer />
            <FinanceContainer />
          </div>
          <div className='w-[60%] flex justify-center items-center'>
            <div className='bg-zinc-950 h-[90%] w-[90%] border border-red-700 rounded-lg flex justify-center items-center'><Example/></div>
          </div>
        </section>
    </div>
  )
}
