import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { rateLimit, throttle } from '@tanstack/react-pacer'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const getRedirectURL = () => window.location.origin + "/console/dashboard";

  const tryLogin = rateLimit(
    throttle(
      async (provider: "google" | "discord" | "github") => {
        const data = await authClient.signIn.social({
          provider,
          callbackURL: getRedirectURL()
        })
        if (data.error) {
          alert(data.error.message)
        }
      },
      { wait: 5000 }
    ),
    {
      limit: 5,
      window: 60 * 500,
      onReject: () => {
        alert("Tente novamente em 30 minutos")
      },
    }
  )

  return (
    <div className='auth-container'>
      <div className='auth-card animate-fade-in'>
        <div className='auth-logo'>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>

        <h1 className='auth-title'>Bem-vindo de volta</h1>
        <p className='auth-subtitle'>Entre com sua conta para continuar</p>

        <div className='w-full flex flex-col gap-3'>
          <button onClick={() => tryLogin('google')} className='oauth-btn'>
            <span className='oauth-icon oauth-icon-google' />
            <span>Continuar com Google</span>
          </button>

          <button onClick={() => tryLogin('discord')} className='oauth-btn'>
            <span className='oauth-icon oauth-icon-discord' />
            <span>Continuar com Discord</span>
          </button>

          <button onClick={() => tryLogin('github')} className='oauth-btn'>
            <span className='oauth-icon oauth-icon-github' />
            <span>Continuar com GitHub</span>
          </button>
        </div>

        <div className='auth-divider'>
          <span>Seguro</span>
        </div>

        <p className='text-[13px] text-center' style={{ color: 'var(--color-text-muted)' }}>
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  )
}
