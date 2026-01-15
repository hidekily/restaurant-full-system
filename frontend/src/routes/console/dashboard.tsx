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
      <div className='bg-zinc-800 h-full w-full flex justify-center'>
        <section className='fixed h-[10%] w-[40%] bg-red-800 mt-4 flex justify-center items-center rounded-md text-white gap-10'>
          <span>{session?.user?.name + "🦥"}</span>
          <Link to="/console/pedidos">Pedidos 🐳</Link>
          <Link to="/console/financa">Finanças 🦉</Link>
        </section>

        <section className='h-[100vh] w-full flex flex-row justify-center items-center gap-15'>

          <div className='input-box-dashboard'>
            <h1 className='mt-4'>categoria</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center text-center gap-5 mt-18'>
              <input type="text" className='input-dashboard' placeholder='topic name' value={nomeCategory} onChange={(e) => {setNomeCategory(e.target.value)}}/>
              <input type="text" placeholder='image URL(optional)' className='input-dashboard' value={imagemUrl} onChange={(e) => {setImagemUrl(e.target.value)}}/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

          <div className='input-box-dashboard'>
            <h1 className='mt-4'>itens</h1>
            <form onSubmit={handleSubmitItem} className='flex flex-col items-center text-center gap-5 mt-18'>
              <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
              <input type="number" className='input-dashboard' placeholder='price' value={preco} onChange={(e) =>{setPreco(e.target.value)}}/>
              <input type="text"  className='input-dashboard' placeholder='which topic' value={categoriaId} onChange={(e) =>{setCategoriaId(e.target.value)}}/>
              <input type="submit" value="submit" className='input-dashboard'/>
            </form>
          </div>

        </section>   
      </div>
    </>
  )
}
