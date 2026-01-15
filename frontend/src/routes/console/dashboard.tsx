import { createFileRoute, Link } from '@tanstack/react-router'
import {authClient} from '../../lib/auth-client'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [nome, setNome] = useState<string>("")
  const [imagemUrl, setImagemUrl] = useState<string>("")  

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

        <section className='h-[100vh] w-full flex flex-row justify-center items-center gap-15'>

          <div className='input-box-dashboard'>
            <h1 className='mt-4'>teste</h1>
            <form action="" className='flex flex-col items-center text-center gap-5 mt-18'>
              <input type="text" className='input-dashboard' placeholder='topic name' value={nome} onChange={(e) => {setNome(e.target.value)}}/>
              <input type="file" accept='image/*' className='input-dashboard' value={imagemUrl} onChange={(e) => {setImagemUrl(e.target.value)}}/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

          <div className='input-box-dashboard'>
            <h1 className='mt-4'>teste</h1>
            <form action="" className='flex flex-col items-center text-center gap-5 mt-18'>
              <input type="text" className='input-dashboard' placeholder='item name'/>
              <input type="number" className='input-dashboard' placeholder='price'/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

        </section>   
      </div>
    </>
  )
}
