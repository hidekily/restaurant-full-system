import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/console')({
  component: RouteComponent,
})

function RouteComponent() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='flex flex-col items-center'>
          <div className='loading-spinner' />
          <span className='loading-text'>Carregando...</span>
        </div>
      </div>
    )
  }

  return <Outlet />
}
