import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'
import { useState, useEffect, use } from 'react'
import { NavbarComponent } from '@/components/dashboardUI/navbar';
import { OrderProps } from '@/types/orderTypes';

export const Route = createFileRoute('/console/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  const [session, setSession] = useState<any>(null);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  async function fetchOrders(){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders)`)
    const data = await res.json()
    setOrders(data)
  }

  async function handleStatusCompleted(orderId: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}}`, {
    method: "PATCH", 
    headers:{
      "Content-Type" : "application/json" 
    },
    body: JSON.stringify({status: "completed"})
    })
  }

  async function handleStatusOnHold(orderId: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`, {
    method: "PATCH", 
    headers:{
      "Content-Type" : "application/json" 
    },
    body: JSON.stringify({status: "onhold"})
    })

    fetchOrders()
  }

  async function fetchSession(){
    const {data} = await authClient.getSession();
    setSession(data);
  }

  useEffect (() => {
    fetchSession();
    fetchOrders();
  }, [])

  return(
    <div className='bg-linear-to-br from-zinc-950 to-indigo-900 h-full w-full flex flex-col'>
        <NavbarComponent um="financa 🦦" dois="dashboard 🦦" linkOne='/console/financa' linkTwo='/console/dashboard'/>

        <div className='bg-emerald-900 w-full h-full overflow-auto flex flex-row items-center gap-2 p-2'>
          {orders && orders.map && orders.map((order) => (
            <div className='bg-zinc-600 w-90 h-full'>
              <p>teste</p>
              <p>{order.tableId}</p>
              <p>{order.status}</p>
              <p>{order.createdAt}</p>
              {order.items.map((items) => (
                <p>{items.menuItemid}</p>
              ))}
              <div>
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
