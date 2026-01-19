import Example from '@/components/recharts'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/console/financa')({
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
          <Link to="/console/pedidos" className='nav-link'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Pedidos
          </Link>
          <Link to="/console/financa" className='nav-link active'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
            Finanças
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <span className='badge badge-primary'>Finanças</span>
        </div>
      </nav>

      {/* Content */}
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title'>Finanças</h1>
          <p className='dashboard-description'>Acompanhe o desempenho financeiro do seu negócio</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='stat-card animate-fade-in'>
            <div className='stat-card-header'>
              <span className='stat-card-title'>Receita Total</span>
              <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
            <span className='stat-card-value'>R$ 12.450</span>
            <div className='stat-card-change positive'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              +12.5% este mês
            </div>
          </div>

          <div className='stat-card animate-fade-in' style={{ animationDelay: '0.1s' }}>
            <div className='stat-card-header'>
              <span className='stat-card-title'>Pedidos</span>
              <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
            <span className='stat-card-value'>284</span>
            <div className='stat-card-change positive'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              +8.2% este mês
            </div>
          </div>

          <div className='stat-card animate-fade-in' style={{ animationDelay: '0.2s' }}>
            <div className='stat-card-header'>
              <span className='stat-card-title'>Ticket Médio</span>
              <div className='w-10 h-10 rounded-lg flex items-center justify-center' style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
            </div>
            <span className='stat-card-value'>R$ 43,85</span>
            <div className='stat-card-change negative'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
              -2.4% este mês
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className='chart-container animate-fade-in' style={{ animationDelay: '0.3s' }}>
          <div className='chart-header'>
            <div>
              <h3 className='chart-title'>Fluxo de Caixa</h3>
              <p className='text-sm mt-1' style={{ color: 'var(--color-text-muted)' }}>Acompanhamento mensal</p>
            </div>
            <div className='chart-legend'>
              <div className='chart-legend-item'>
                <div className='chart-legend-dot' style={{ background: '#6366f1' }} />
                <span>Caixa</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '400px' }}>
            <Example />
          </div>
        </div>
      </div>
    </div>
  )
}
