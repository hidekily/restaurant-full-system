import { createFileRoute, Link } from '@tanstack/react-router'
import {authClient} from '../../lib/auth-client'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [nomeCategory, setNomeCategory] = useState<string>("")
  const [imagemUrl, setImagemUrl] = useState<string>("")
  const [nomeItem, setNomeItem] =  useState<string>("")
  const [categoriaId, setCategoriaId] = useState<string>("")
  const [preco, setPreco] = useState<string>("")

  async function handleSubmitItem(e: React.FormEvent){
    e.preventDefault()

    const storeDataItem = await fetch("http://localhost:3001/api/admin/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({nome: nomeItem, categoriaId: categoriaId, preco: preco})
    })

    setCategoriaId("")
    setNomeCategory("")
    setPreco("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // impede o reload da página

    const storeData = await
     fetch("http://localhost:3001/api/admin/categories", {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({nomeCategory, imagemUrl})
  })

  setNomeItem("")
  setImagemUrl("")
  }

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
      <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex justify-center'>
        {/* navbar */}
        <nav className='fixed h-[8.5%] w-full bg-zinc-950 flex flex-row rounded-md text-white border-b border-red-700'>
          <section className='w-[40%] h-[100%] flex flex-row justify-center items-center'>
            <span className='font-bold text-red-700 text-lg'>{session?.user.name + "🦦"}</span>
          </section>
          <section className='w-[60%] flex flex-row justify-center items-center gap-10'>
            <Link to="/console/financa" className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
              Finance 🦥
            </Link>
            <Link to="/console/pedidos" className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
              pedidos 🦥
            </Link>
          </section>  
        </nav>

        {/* aqui acaba a navbar o tailwind ta me deixando louco */}

        <section className='h-[100vh] w-full grid grid-cols-1 md:grid-cols-2 overflow-auto justify-items-center items-center gap-10 pt-25 px-4'>
          <div className='input-box-dashboard'>
            <h1 className='mt-4'>categoria</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center text-red-700 gap-8 mt-10'>
              <input type="text" className='input-dashboard' placeholder='topic name' value={nomeCategory} onChange={(e) => {setNomeCategory(e.target.value)}}/>
              <input type="text" placeholder='image URL(optional)' className='input-dashboard' value={imagemUrl} onChange={(e) => {setImagemUrl(e.target.value)}}/>
              <hr className='h-[0.1rem] w-full'/> 
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

          <div className='input-box-dashboard'>
            <h1 className='mt-3'>itens</h1>
            <form onSubmit={handleSubmitItem} className='flex flex-col items-center text-red-700 gap-4 mt-8'>
              <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
              <input type="number" className='input-dashboard' placeholder='price' value={preco} onChange={(e) =>{setPreco(e.target.value)}}/>
              <input type="text"  className='input-dashboard' placeholder='which topic' value={categoriaId} onChange={(e) =>{setCategoriaId(e.target.value)}}/>
              <hr className='h-[0.1rem] w-full'/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

           <div className='input-box-dashboard'>
            <h1 className='mt-3'>delete catgory</h1>
            <form onSubmit={handleSubmitItem} className='flex flex-col items-center text-red-700 gap-8 mt-8'>
              <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
              <hr className='h-[0.1rem] w-full'/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

           <div className='input-box-dashboard'>
            <h1 className='mt-3'>delete item</h1>
            <form onSubmit={handleSubmitItem} className='flex flex-col items-center text-red-700 gap-6 mt-8'>
              <input type="text"  className='input-dashboard' placeholder='delete item' value={categoriaId} onChange={(e) =>{setCategoriaId(e.target.value)}}/>
              <input type="text"  className='input-dashboard' placeholder='delete item' value={categoriaId} onChange={(e) =>{setCategoriaId(e.target.value)}}/>
              <hr className='h-[0.1rem] w-full'/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}
