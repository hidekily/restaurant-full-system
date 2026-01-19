import { createFileRoute, Link } from '@tanstack/react-router'
import { authClient } from '../../lib/auth-client'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/console/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [nomeCategory, setNomeCategory] = useState<string>("")
  const [imagemUrl, setImagemUrl] = useState<string>("")
  const [nomeItem, setNomeItem] = useState<string>("")
  const [categoriaId, setCategoriaId] = useState<string>("")
  const [preco, setPreco] = useState<string>("")
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("")
  const [deleteItemId, setDeleteItemId] = useState<string>("")
  const [session, setSession] = useState<any>(null)

  async function handleSubmitItem(e: React.FormEvent) {
    e.preventDefault()

    await fetch("http://localhost:3001/api/admin/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ nome: nomeItem, categoriaId: categoriaId, preco: preco })
    })

    setNomeItem("")
    setCategoriaId("")
    setPreco("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch("http://localhost:3001/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ nomeCategory, imagemUrl })
    })

    setNomeCategory("")
    setImagemUrl("")
  }

  async function fetchSession() {
    const { data } = await authClient.getSession()
    setSession(data)
  }

  useEffect(() => {
    fetchSession()
  }, [])

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
          <Link to="/console/dashboard" className='nav-link active'>
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
          <span className='badge badge-success'>{session?.user?.name}</span>
        </div>
      </nav>

      {/* Content */}
      <div className='dashboard-content'>
        <div className='dashboard-header'>
          <h1 className='dashboard-title'>Dashboard</h1>
          <p className='dashboard-description'>Gerencie categorias e itens do seu cardápio</p>
        </div>

        <div className='dashboard-grid'>
          {/* Add Category Card */}
          <div className='form-card animate-fade-in'>
            <div className='form-card-header'>
              <div className='form-card-icon success'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className='form-card-title'>Adicionar Categoria</span>
            </div>
            <div className='form-card-body'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='form-group'>
                  <label className='input-label'>Nome da categoria</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='Ex: Bebidas, Lanches...'
                    value={nomeCategory}
                    onChange={(e) => setNomeCategory(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label className='input-label'>URL da imagem (opcional)</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='https://...'
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                  />
                </div>
                <button type="submit" className='btn btn-primary w-full'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Adicionar
                </button>
              </form>
            </div>
          </div>

          {/* Add Item Card */}
          <div className='form-card animate-fade-in' style={{ animationDelay: '0.1s' }}>
            <div className='form-card-header'>
              <div className='form-card-icon'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <span className='form-card-title'>Adicionar Item</span>
            </div>
            <div className='form-card-body'>
              <form onSubmit={handleSubmitItem} className='flex flex-col gap-4'>
                <div className='form-group'>
                  <label className='input-label'>Nome do item</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='Ex: Coca-Cola, X-Burguer...'
                    value={nomeItem}
                    onChange={(e) => setNomeItem(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label className='input-label'>Preço</label>
                  <input
                    type="number"
                    className='input'
                    placeholder='0.00'
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label className='input-label'>ID da categoria</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='ID da categoria'
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                  />
                </div>
                <button type="submit" className='btn btn-primary w-full'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Adicionar
                </button>
              </form>
            </div>
          </div>

          {/* Delete Category Card */}
          <div className='form-card animate-fade-in' style={{ animationDelay: '0.2s' }}>
            <div className='form-card-header'>
              <div className='form-card-icon danger'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <span className='form-card-title'>Excluir Categoria</span>
            </div>
            <div className='form-card-body'>
              <form className='flex flex-col gap-4'>
                <div className='form-group'>
                  <label className='input-label'>ID da categoria</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='ID da categoria para excluir'
                    value={deleteCategoryId}
                    onChange={(e) => setDeleteCategoryId(e.target.value)}
                  />
                </div>
                <button type="submit" className='btn btn-danger w-full'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Excluir
                </button>
              </form>
            </div>
          </div>

          {/* Delete Item Card */}
          <div className='form-card animate-fade-in' style={{ animationDelay: '0.3s' }}>
            <div className='form-card-header'>
              <div className='form-card-icon danger'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <span className='form-card-title'>Excluir Item</span>
            </div>
            <div className='form-card-body'>
              <form className='flex flex-col gap-4'>
                <div className='form-group'>
                  <label className='input-label'>ID do item</label>
                  <input
                    type="text"
                    className='input'
                    placeholder='ID do item para excluir'
                    value={deleteItemId}
                    onChange={(e) => setDeleteItemId(e.target.value)}
                  />
                </div>
                <button type="submit" className='btn btn-danger w-full'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Excluir
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
