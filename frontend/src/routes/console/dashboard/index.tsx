import { createFileRoute } from '@tanstack/react-router'
import { useState} from 'react'
import { API_URL } from '@/lib/api'
import { useQueryClient, useQuery} from '@tanstack/react-query'

export const Route = createFileRoute('/console/dashboard/')({
  component: RouteComponent,
})

export function RouteComponent() {
  const [tableNum, setTableNum] = useState<string>("")
  const [area, setArea] = useState<string>("")

  const queryClient = useQueryClient()

  const {data} = useQuery<{id: number, number: number, area: string}[]>({ //esse eu vou usar o submit
    queryKey: ['tables'],
    queryFn: async() => {
      const response = await fetch(`${API_URL}/api/admin/tables`, {
        credentials: 'include'
      })
      return response.json()
    }
  })

  // useMutation({
  // vou usar dps para implementar loading e error com algum modal que vou fzr
  // })

  async function handleSubmitTableNum(e: React.FormEvent){
    e.preventDefault()
    const storeData = await fetch(`${API_URL}/api/admin/tables`, {
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      credentials: "include",
      body: JSON.stringify({number: Number(tableNum), area: area})
    })

    setArea('')
    setTableNum("")
    queryClient.invalidateQueries({queryKey: ["tables"]})
  }

  async function handleDeleteTableNum(e: React.FormEvent){
    e.preventDefault()

    await fetch(`${API_URL}/api/admin/tables/${tableNum}`, {
      method: "DELETE",
      credentials: "include"
    })

    setTableNum('')
    queryClient.invalidateQueries({queryKey: ['tables']})
  }

  if(!data) return null

  return(
    <div className='customfont outlet-dashboard'>
      <div className='input-box'>
        <h1 className='text-[#7A5C3E] customfont2'>add table</h1>
        <form className="input-form" onSubmit={handleSubmitTableNum}>
          <input placeholder='eg, 1 | 2 | 3...' value={tableNum} className='input-dashboard' onChange={(e) => setTableNum(e.target.value)}/>
          <select className='input-dashboard' value={area} onChange={(e) => setArea(e.target.value)}>
            <option>select your area</option>
            <option value="indoor">indoor</option>
            <option value="outdoor">outdoor</option>
          </select>
          <input value="add" type="submit" className='input-dashboard text-green-500 bg-[#F2C56B]' />
        </form>
      </div>

      <div className='input-box'>
        <h1 className='text-[#7A5C3E] customfont2'>delete table</h1>
        <form className='input-form' onSubmit={handleDeleteTableNum}>
          <select value={tableNum} onChange={(e) => setTableNum(e.target.value)} className='input-dashboard'>
            <option>Select table</option>
            {data && data.sort && data.sort((a, b) => a.number - b.number).map((table) => (
              <option value={table.id} key={table.id}>{table.area} | {table.number} </option>
            ))}
          </select>
          <input value="delete" type="submit" className='input-dashboard text-red-500 bg-[#F2C56B]'/>
        </form>
      </div>
    </div>
  )
}
