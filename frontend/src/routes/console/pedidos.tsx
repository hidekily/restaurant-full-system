import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'
import { useState, useEffect } from 'react'
import { NavbarComponent } from '@/components/dashboardUI/navbar';

export const Route = createFileRoute('/console/pedidos')({
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

  return(
    <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex flex-col'>
        <NavbarComponent um="financa 🦦" dois="dashboard 🦦" linkOne='/console/financa' linkTwo='/console/dashboard'/>

        <div className='flex flex-row h-full w-full items-center gap-5 overflow--auto'>
          <section className='h-[90%] w-100 bg-zinc-900 flex flex-col items-center text-white gap-10 text-3xl'>
            <p className='text-5xl text-green-400'>Mesa: 5</p>
            <p className='text-5xl text-red-500'>11:54am</p>
            <p className='text-lg'>PEDIDO</p>
            <p className='text-lg'>PEDIDO</p>
            <p className='text-lg'>PEDIDO</p>
            <p className='text-lg'>PEDIDO</p>
          </section>
              
        </div>
    </div>
  )
}
