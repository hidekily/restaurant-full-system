import { createFileRoute } from '@tanstack/react-router'
import { NavbarComponent } from '@/components/dashboardUI/navbar';
import { API_URL } from '@/lib/api';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { OrderProps } from '@/types/orderTypes';
import { useState } from 'react';

export const Route = createFileRoute('/console/pedidos')({
  component: RouteComponent,
})

const buttonStatus: Record<string, string[]> = {
  pending: ["onhold", "completed"],
  onhold: ["pending", "completed"],
  completed: ["onhold", "pending"]
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<"pending" | "onhold" | "completed">("pending")

  const {data, isLoading, error} = useQuery<OrderProps[]>({
    queryKey: ["orders"],
    queryFn: async() =>  {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        credentials: 'include'
      })
      return response.json()
    }
  })

  async function handleStatus(orderId: string, status: string){
    await fetch(`${API_URL}/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json" 
      },
      credentials: "include",
      body: JSON.stringify({ status })
    })
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }

  return(
    <div className='bg-[#F4EAE0] h-full w-full flex flex-col justify-center items-center'>
        <NavbarComponent um="financa 🦦" dois="dashboard 🦦" linkOne='/console/financa' linkTwo='/console/dashboard'/>

        <nav className='h-[10%] flex flex-row justify-center items-center w-full gap-5 font-bold customfont2'>
          <button onClick={() => setActiveTab("pending")}>Pending</button> |
          <button onClick={() => setActiveTab('onhold')}>Onhold</button> |
          <button onClick={() => setActiveTab('completed')}>Completed</button>
        </nav>

        <div className='w-full flex-1 min-h-0 overflow-x-auto flex flex-row gap-3 p-3'>
          {data && data.filter && data.filter(order => order.status === activeTab).map((order) => (
            <div key={order.id} className='bg-[#E8D8C4] w-60 shrink-0 flex flex-col rounded-2xl border border-[#C4956A]/40 shadow-md'>
              <div className='flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-2 text-[#2C2118]'>
                <p className='font-bold text-[#4A3728]'>Mesa: {order.tableId}</p>
                <p className='text-sm text-[#7A5C3E]'>Status: {order.status}</p>
                <p className='text-xs text-[#C4956A]'>Data: {order.createdAt}</p>
                <hr className='border-[#C4956A]/50'/>
                {order.items.map((items) => (
                  <p key={items.id} className='flex gap-2 text-sm'>
                    {items.menuItem?.name || "item removido"}
                    <span className='text-[#C4956A]'>|</span>
                    {items.quantity}X
                  </p>
                ))}
              </div>
              <div className='shrink-0 flex flex-row items-center justify-center gap-1 pb-2'>
                {buttonStatus[order.status].map((status: string) => (
                  <button key={status} onClick={() => handleStatus(order.id, status)} className='w-[45%] bg-[#C4956A] h-10 mb-5 rounded-lg text-[#2C2118]'>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
