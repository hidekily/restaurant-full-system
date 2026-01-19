import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Categoria } from '@/data/categoryInterface'
import { useEffect, useState } from 'react'
import { CategoryCard } from '@/components/categorycards'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:3001/api/menu/categories")
        const data = await response.json()
        setCategorias(data)
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategorias()
  }, [])

  return (
    <div className='menu-container'>
      <nav className='menu-navbar'>
        {/* Logo */}
        <div className='flex items-center gap-3 shrink-0 pr-4 border-r' style={{ borderColor: 'var(--color-border)' }}>
          <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className='text-base font-semibold' style={{ color: 'var(--color-text-primary)' }}>Menu</span>
        </div>

        {/* Categories */}
        {loading ? (
          <div className='flex items-center gap-2'>
            <div className='loading-spinner' style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
            <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Carregando categorias...</span>
          </div>
        ) : categorias.length > 0 ? (
          categorias.map((categoria) => (
            <CategoryCard
              key={categoria.id}
              nome={categoria.nome}
              imagemUrl={categoria.imagemUrl}
              id={categoria.id}
            />
          ))
        ) : (
          <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Nenhuma categoria encontrada</span>
        )}
      </nav>

      <Outlet />
    </div>
  )
}
