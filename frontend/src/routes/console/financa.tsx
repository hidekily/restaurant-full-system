import Example from '@/components/recharts'
import { createFileRoute } from '@tanstack/react-router'
import { FinanceContainer } from '@/components/financeContainer'
import { NavbarComponent } from '@/components/dashboardUI/navbar';

export const Route = createFileRoute('/console/financa')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='bg-[#F4EAE0] h-full w-full flex flex-col items-center'>
        <NavbarComponent um="dashboard 🦦" dois="pedidos 🦦" linkOne='/console/dashboard' linkTwo='/console/pedidos'/>

        <section className='h-[80%] w-full  flex flex-row'>
          <div className='w-[40%] h-full flex flex-col gap-5 justify-center items-center'>
            <FinanceContainer />
            <FinanceContainer />
            <FinanceContainer />
          </div>
          <div className='w-[60%] flex justify-center items-center'>
            <div className='bg-[#E8D8C4] h-[90%] w-[90%] border border-[#C4956A]/40 rounded-lg shadow-md flex justify-center items-center'><Example/></div>
          </div>
        </section>
    </div>
  )
}
