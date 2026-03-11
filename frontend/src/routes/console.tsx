import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/dashboardUI/modal'

export const Route = createFileRoute('/console')({
  component: RouteComponent,
})

function RouteComponent() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data } = await authClient.getSession()
        setSession(data)
      } catch (error) {
        console.error('Erro ao buscar sessão:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  useEffect(() => {
    if(!loading && !session){
      window.alert("please login")
      navigate({to:"/"})
    }
  }, [loading, session])

  if (loading){
    return (
      <div className='inset-0 w-full h-full bg-[#F4EAE0]/80 flex justify-center items-center'>
        <div className="w-10 h-10 border-4 border-sand border-t-black rounded-full animate-spin" />     
      </div>
    )
  }

  if(!session){
    return null
  }

  return <Outlet />
}
