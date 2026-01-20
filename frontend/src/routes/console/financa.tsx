import Example from '@/components/recharts'
import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'
import { useState, useEffect } from 'react'
import { FinanceContainer } from '@/components/financeContainer'

export const Route = createFileRoute('/console/financa')({
  component: RouteComponent,
})

function RouteComponent() {
  const [session, setSession] = useState<any>(null);

  async function fetchSession(){
    const {data} = await authClient.getSession();
    setSession(data);
  }

  useEffect (() => {
    fetchSession();
  }, [])

  return (
    <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex justify-center'>
        <nav className='fixed h-[8.5%] w-full bg-zinc-950 flex flex-row rounded-md text-white border-b border-red-700'>
          <section className='w-[40%] h-[100%] flex flex-row justify-center items-center'>
            <span className='font-bold text-red-700 text-lg'>{session?.user.name + "🦦"}</span>
          </section>
          <section className='w-[60%] flex flex-row justify-center items-center gap-10'>
            <Link to="/console/dashboard" className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
              Dashboard 🦥
            </Link>
            <Link to="/console/pedidos" className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
              Pedidos 🐳
            </Link>
          </section>
        </nav>

        <section className='h-[80%] w-full mt-30 flex flex-row'>
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
