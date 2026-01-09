import { createFileRoute, Link } from '@tanstack/react-router'
import {authClient} from '../../lib/auth-client'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/console/dashboard')({
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
    <>
      <div className='bg-zinc-800 h-full w-full flex justify-center'>
        <section className='fixed h-[10%] w-[40%] bg-red-800 mt-4 flex justify-center items-center rounded-md text-white gap-10'>
          <span>{session?.user?.name + "🦥"}</span>
          <Link to="/console/pedidos">Pedidos 🐳</Link>
          <Link to="/console/financa">Finanças 🦉</Link>
        </section>

        <section className='mt-30 text-red-500 text-2xl overflow-auto h-[80%] w-[95%] grid grid-cols-5 justify-center items-center gap-4'>
          <div className='h-full w-full flex flex-col items-center gap-4 border-1 border-red-800 rounded-lg bg-zinc-900/80'>
            <span className='mt-4'>segunda</span>            
            <span>{'teste'}</span>
          </div>
          <div className='h-full w-full flex flex-col items-center gap-4 border-1 border-red-800 rounded-lg bg-zinc-900/80'>
            <span className='mt-4'>terça</span>            
            <span>{'teste'}</span>
          </div>
          <div className='h-full w-full flex flex-col items-center gap-4 border-1 border-red-800 rounded-lg bg-zinc-900/80'>
            <span className='mt-4'>quarta</span>            
            <span>{'teste'}</span>
          </div>
          <div className='h-full w-full flex flex-col items-center gap-4 border-1 border-red-800 rounded-lg bg-zinc-900/80'>
            <span className='mt-4'>quinta</span>            
            <span>{'teste'}</span>
          </div>
          <div className='h-full w-full flex flex-col items-center gap-4 border-1 border-red-800 rounded-lg bg-zinc-900/80'>
            <span className='mt-4'>sexta</span>            
            <span>{'teste'}</span>
          </div>
        </section>   
      </div>
    </>
  )
}
