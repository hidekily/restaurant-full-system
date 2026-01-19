import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/console/pedidos')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='dashboard-container'>
      {/* Navbar */}
      <nav className='navbar'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-lg flex items-center justify-center' style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className='text-lg font-semibold' style={{ color: 'var(--color-text-primary)' }}>RelayWeb</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Link to="/console/dashboard" className='nav-link'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            Dashboard
          </Link>
          <Link to="/console/pedidos" className='nav-link active'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Pedidos
          </Link>
          <Link to="/console/financa" className='nav-link'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
            Finanças
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <span className='badge badge-warning'>Pedidos</span>
        </div>
      </nav>

      {/* Content */}
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title'>Pedidos</h1>
          <p className='dashboard-description'>Acompanhe e gerencie os pedidos em tempo real</p>
        </div>

        {/* Empty State */}
        <div className='card animate-fade-in'>
          <div className='flex flex-col items-center justify-center py-16'>
            <div className='w-20 h-20 rounded-full flex items-center justify-center mb-6' style={{ background: 'var(--color-bg-tertiary)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2' style={{ color: 'var(--color-text-primary)' }}>Nenhum pedido ainda</h3>
            <p className='text-center max-w-md' style={{ color: 'var(--color-text-muted)' }}>
              Quando os clientes fizerem pedidos, eles aparecerão aqui para você gerenciar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
