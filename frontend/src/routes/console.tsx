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
      <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>
        <span className='text-white'>Loading session...</span>
      </div>
    )
  }

  return (
    <Outlet />
  )
}