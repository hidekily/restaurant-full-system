import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { useState, useEffect } from 'react'

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
      window.alert("precisar estar logado")
      navigate({to:"/"})
    }
  }, [loading, session])

  if (loading){
    return (
      <div className='loading-container'>
        <div className='flex flex-col items-center'>
          <div className='loading-spinner' />
          <span className='loading-text'>Carregando...</span>
        </div>
      </div>
    )
  }

  if(!session){
    return null
  }

  return <Outlet />
}
