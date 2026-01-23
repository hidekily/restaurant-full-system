import { createFileRoute} from '@tanstack/react-router'
import { useState } from 'react';
import { NavbarComponent } from '@/components/dashboardUI/navbar';

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  // imports e functions dentro do componente
  const [nameCategory, setNameCategory] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [nomeItem, setNomeItem] =  useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [preco, setPreco] = useState<string>("")

  async function handleSubmitItem(e: React.FormEvent){
    e.preventDefault()

    const storeDataItem = await fetch("http://localhost:3001/api/admin/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({name: nomeItem, categoryId: Number(categoryId), price: preco})
    })

    setCategoryId("")
    setNameCategory("")
    setPreco("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

  const storeData = await
     fetch("http://localhost:3001/api/admin/categories", {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({name: nameCategory, imageUrl})
  })

  setNameCategory("")
  setImageUrl("")
  }


  // separacao para n ficar confuso o codigo
  return(
      <>
        {/* condigo UI */}
        <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex flex-col items-center'>

          {/* esta em /src/routes/components/UI */}
          <NavbarComponent um="financa 🦦" dois="pedidos 🦦" linkOne='/console/financa' linkTwo='/console/pedidos'/>

          <section className='h-[105%] w-full grid grid-cols-1 md:grid-cols-2 overflow-auto justify-items-center items-center gap-10 pt-4 px-4'>
            <div className='input-box-dashboard'>
              <h1 className='mt-4'>adicionar categoria 🐣</h1>
              <form onSubmit={handleSubmit} className='flex flex-col items-center text-red-700 gap-8 mt-10'>
                <input type="text" className='input-dashboard' placeholder='topic name' value={nameCategory} onChange={(e) => {setNameCategory(e.target.value)}}/>
                <input type="text" placeholder='image URL(optional)' className='input-dashboard' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}}/>
                <hr className='h-[0.1rem] w-full'/> 
                <input type="submit" value="submit" className='input-dashboard'/>
              </form>
            </div>

            <div className='input-box-dashboard'>
              <h1 className='mt-3'>adicionar itens 🐣</h1>
              <form onSubmit={handleSubmitItem} className='flex flex-col items-center text-red-700 gap-4 mt-8'>
                <input type="text" className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
                <input type="number" className='input-dashboard' placeholder='price' value={preco} onChange={(e) =>{setPreco(e.target.value)}}/>
                <input type="text"  className='input-dashboard' placeholder='which topic' value={categoryId} onChange={(e) =>{setCategoryId(e.target.value)}}/>
                <hr className='h-[0.1rem] w-full'/>
                <input type="submit" value="submit" className='input-dashboard'/>
              </form>
            </div>

             <div className='input-box-dashboard'>
              <h1 className='mt-3'>delete category 🗑️</h1>
              <form  className='flex flex-col items-center text-red-700 gap-8 mt-8'>
                <input type="text" className='input-dashboard' placeholder='category id' value={categoryId} onChange={(e) =>{setCategoryId(e.target.value)}}/>
                <hr className='h-[0.1rem] w-full'/>
                <input type="submit" value="submit" className='input-dashboard'/>
              </form>
            </div>

             <div className='input-box-dashboard'>
              <h1 className='mt-3'>delete item 🗑️</h1>
              <form  className='flex flex-col items-center text-red-700 gap-6 mt-8'>
                <input type="text"  className='input-dashboard' placeholder='item name' value={nomeItem} onChange={(e) =>{setNomeItem(e.target.value)}}/>
                <input type="text"  className='input-dashboard' placeholder='category id' value={categoryId} onChange={(e) =>{setCategoryId(e.target.value)}}/>
                <hr className='h-[0.1rem] w-full'/>
                <input type="submit" value="submit" className='input-dashboard'/>
              </form>
            </div>
          </section>
        </div>
      </>
  ) 
} 
