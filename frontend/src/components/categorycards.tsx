import { Link } from "@tanstack/react-router"

interface CategoryCardProps {
  id: number
  nome: string
  imagemUrl?: string
}

export function CategoryCard({ id, nome, imagemUrl }: CategoryCardProps) {
  return (
    <Link
      to="/menu/$categoriaId"
      params={{ categoriaId: String(id) }}
      className='category-card'
    >
      {imagemUrl ? (
        <img
          src={imagemUrl}
          alt={nome}
          className='category-card-image'
        />
      ) : (
        <div className='w-12 h-12 rounded-lg flex items-center justify-center mb-2' style={{ background: 'var(--color-bg-tertiary)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
      <span className='category-card-name'>{nome}</span>
    </Link>
  )
}
