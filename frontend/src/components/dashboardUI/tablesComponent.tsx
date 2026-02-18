import { useState, useEffect } from 'react'

export function TablesComponent() {
  const [tableNum, setTableNum] = useState<string>("")
  const [area, setArea] = useState<string>("")

  async function handleSubmitTableNum(e: React.FormEvent){
    e.preventDefault()

    const storeData = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tables`, {
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      credentials: "include",
      body: JSON.stringify({number: Number(tableNum), area: area})
    })

    setArea('')
    setTableNum("")
  }

  async function handleDeleteTableNum(e: React.FormEvent){
    e.preventDefault()

    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tables/${tableNum}`, {
      method: "DELETE",
      credentials: "include"
    })

    setArea('')
    setTableNum('')
  }

  return(
    <div className='customfont outlet-dashboard'>
      <div className='input-box'>
        <h1 className='text-green-500'>add table</h1>
        <form className="input-form" onSubmit={handleSubmitTableNum}>
          <input placeholder='adicione uma mesa' value={tableNum} className='input-dashboard' onChange={(e) => setTableNum(e.target.value)}/>
          <select className='input-dashboard' value={area} onChange={(e) => setArea(e.target.value)}>
            <option>select your area</option>
            <option value="indoor">indoor</option>
            <option value="outdoor">outdoor</option>
          </select>
          <input value="add" type="submit" className='input-dashboard text-green-500 bg-black' />
        </form>
      </div>

      <div className='input-box'>
        <h1 className='text-red-500'>delete table</h1>
        <form className='input-form' onSubmit={handleDeleteTableNum}>
          <input placeholder='delete uma mesa' value={tableNum} className='input-dashboard' onChange={(e) => setTableNum(e.target.value)}/>
          <input value="delete" type="submit" className='input-dashboard text-red-500 bg-black'/>
        </form>
      </div>
    </div>
  )
}
