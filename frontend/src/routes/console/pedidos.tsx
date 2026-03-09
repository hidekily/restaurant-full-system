import { createFileRoute } from '@tanstack/react-router'
import { NavbarComponent } from '@/components/dashboardUI/navbar';
import { API_URL } from '@/lib/api';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { OrderProps } from '@/types/orderTypes';

export const Route = createFileRoute('/console/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()


  const {data, isLoading, error} = useQuery<OrderProps[]>({
    queryKey: ["orders"],
    queryFn: async() =>  {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        credentials: 'include'
      })
      return response.json()
    }
  })

  async function handleStatusCompleted(orderId: string) {
    const res = await fetch(`${API_URL}/api/admin/orders/${orderId}`, {
    method: "PATCH", 
    headers:{
      "Content-Type" : "application/json" 
    },
    credentials: "include",
    body: JSON.stringify({status: "completed"})
    })

    queryClient.invalidateQueries({queryKey: ['orders']})
  }

  async function handleStatusOnHold(orderId: string) {
    const res = await fetch(`${API_URL}/api/admin/orders/${orderId}`, {
    method: "PATCH", 
    headers:{
      "Content-Type" : "application/json" 
    },
    credentials: "include",
    body: JSON.stringify({status: "onhold"})
    })
    
    queryClient.invalidateQueries({queryKey: ['orders']})
  }

  return(
    <div className='bg-zinc-800 h-full w-full flex flex-col'>
        <NavbarComponent um="financa 🦦" dois="dashboard 🦦" linkOne='/console/financa' linkTwo='/console/dashboard'/>

        <div className='w-full h-full overflow-auto flex flex-row items-center gap-2 p-2'>
          {data && data.map && data.map((order) => (
            <div key={order.id} className='bg-zinc-600 w-90 h-[100%] flex flex-col rounded-2xl'>
              <div className='h-[90%] p-2 flex flex-col gap-2'>
                <p>Table: {order.tableId}</p>
                <p>Status: {order.status}</p>
                <p>Date: {order.createdAt}</p>
                <hr className='text-red-400'/>
                {order.items.map((items) => (
                  <p key={items.id} className='flex gap-2'>
                    {items.menuItem?.name || "item removido"}
                    <span className='text-red-300'>|</span> 
                    {items.quantity}X
                  </p>
                ))}
              </div>
              <div className='flex flex-row items-center justify-center h-[10%] gap-1'>
                <button 
                  onClick={() => handleStatusOnHold(order.id)} 
                  className='button-status'
                >
                  <p>onhold</p>
                </button>  
                <button 
                  onClick={() => handleStatusCompleted(order.id)} 
                  className='button-status'
                >
                  <p>completed</p>
                </button>  
              </div>
            </div>
          ))}
        </div>  
    </div>
  )
}
