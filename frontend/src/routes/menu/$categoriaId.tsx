import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/menu/$categoriaId')({
  component: RouteComponent,
})

interface Item {
  id: number
  nome: string
  preco: string
  descricao?: string
  imagemUrl?: string
  categoriaId: number
}

function RouteComponent() {
  const { categoriaId } = Route.useParams()
  const [itens, setItens] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItens() {
      try {
        const res = await fetch(`http://localhost:3001/api/menu/items?categoriaId=${categoriaId}`)
        const data = await res.json()
        setItens(data)
      } catch (error) {
        console.error('Erro ao carregar itens:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchItens()
  }, [categoriaId])

  if (loading) {
    return (
      <div className='items-grid'>
        <div className='flex items-center justify-center col-span-full py-20'>
          <div className='flex flex-col items-center gap-4'>
            <div className='loading-spinner' />
            <span style={{ color: 'var(--color-text-muted)' }}>Carregando itens...</span>
          </div>
        </div>
      </div>
    )
  }

  if (itens.length === 0) {
    return (
      <div className='items-grid'>
        <div className='flex items-center justify-center col-span-full py-20'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center' style={{ background: 'var(--color-bg-tertiary)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>Nenhum item nesta categoria</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='items-grid'>
      {itens.map((item, index) => (
        <div
          key={item.id}
          className='item-card animate-fade-in'
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {item.imagemUrl ? (
            <img
              src={item.imagemUrl}
              alt={item.nome}
              className='item-card-image'
            />
          ) : (
            <div className='item-card-image flex items-center justify-center'>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          <div className='item-card-body'>
            <h3 className='item-card-name'>{item.nome}</h3>
            {item.descricao && (
              <p className='item-card-description'>{item.descricao}</p>
            )}
            <div className='item-card-footer'>
              <span className='item-card-price'>
                R$ {parseFloat(item.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <button className='item-card-btn'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
