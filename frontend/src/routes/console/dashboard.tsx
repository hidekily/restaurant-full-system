import { createFileRoute, Link, Outlet} from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import { NavbarComponent } from '@/components/dashboardUI/navbar';
import { ConfirmModal } from '@/components/confirmModal';

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  // ta confuso mas vou explicar 🦦🤓
  const [nameCategory, setNameCategory] = useState<string>("") // this one sets category name in the input
  const [imageUrl, setImageUrl] = useState<string>("") // this one sets image url in the input
  const [nomeItem, setNomeItem] =  useState<string>("") // this one sets item name in the input
  const [categoryId, setCategoryId] = useState<string>("") // this one sets category id in the input for item creation
  const [preco, setPreco] = useState<string>("") // this one sets item price in the input
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryDelete, setCategoryDelete] = useState<{id: number, name: string} | null>(null)
  const [isCategory, setCategory] = useState<{id: number, name: string}[]>()

  useEffect(() =>{
    fetchCategorias()
  }, [])

  async function fetchCategorias(){
    const response = await fetch("http://localhost:3001/api/menu/categories")
    const data = await response.json()
    setCategory(data)
  }

  async function OpenModal(e: React.FormEvent){
    e.preventDefault()
    setIsOpen(true)
  }

  async function handleDeleteCategory(){
    const res = await fetch(`http://localhost:3001/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      credentials: "include"
    })
    fetchCategorias()
    setIsOpen(false)
    setCategoryId("")
  }

  async function handleDeleteItem(){
    const res = await fetch(`http://localhost:3001/api/admin/items/${nomeItem}`, {
      method: "DELETE",
      credentials: "include"
    })
    fetchCategorias()
    setIsOpen(false)
    setCategoryId("")
  }

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

  const storeDataCategory = await
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
        <ConfirmModal
          title={`Delete this category? : ${categoryId}`} 
          isOpen={isOpen} 
          onConfirm={handleDeleteCategory} 
          onCancel={() => setIsOpen(false)}
        />

        <div className='customfont bg-zinc-950 h-full w-full flex flex-col items-center'>
          {/* esta em /src/routes/components/UI */}
          <NavbarComponent um="financa 🦦" dois="pedidos 🦦" linkOne='/console/financa' linkTwo='/console/pedidos'/>

          <div className='flex flex-row w-full h-full bg-teal-400'>
            <section className='w-[20%] bg-zinc-800 border-r-2 border-red-500 flex flex-col gap-10 p-4 items-center'>
              <Link to="/console/dashboard/add" className='w-40 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center mt-10 text-green-400'>
                Add Item
              </Link>
              <Link to="/console/dashboard/del" className='w-40 h-15 bg-zinc-900 rounded-2xl flex justify-center items-center text-red-500'>
                Delete Item
              </Link>
            </section>

            <section className='w-[80%] bg-zinc-900'>
              <Outlet />
            </section>
          </div>
        </div>
      </>
  ) 
} 
