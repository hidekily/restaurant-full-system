import { createFileRoute} from '@tanstack/react-router'
import {authClient} from '../lib/auth-client'
import {rateLimit, throttle} from '@tanstack/react-pacer'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})



function RouteComponent() {
  const getRedirectURL = () => window.location.origin + "/console/dashboard";

  const tryLogin = rateLimit(
    throttle(
        async(provider: "google" | "discord" | "github") => {
        const data = await authClient.signIn.social({
          provider, 
          callbackURL: getRedirectURL()
        })
        if(data.error){
          alert(data.error.message)
        }
      },
      {wait: 5000}
    ),
    {
      limit: 5,
      window: 60 * 500,
      onReject: () => {
        alert("tente denovo daqui 30 minutos")
      }, 
    }
  )

  return (
    <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>
      <section className="h-[85%] w-[35%] border-1 border-red-500 rounded-lg justify-center items-center
                          flex flex-col bg-zinc-900/50 shadow-2xl shadow-red-500"
      >

        <h1 className="text-red-700 text-3xl mb-20">Login🦥</h1>
 
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5 mt-10'>
          <button onClick={() => {tryLogin('google')}} className='text-white cursor-pointer'>
            Login with Google
          </button>
          <section className='google' />
        </section>
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5'>
          <button onClick={() => {tryLogin('discord')}} className='text-white cursor-pointer'>
            Login with Discord
          </button>
          <section className='discord' />
        </section>
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5'>
          <button onClick={() => {tryLogin('github')}} className='text-white cursor-pointer'>
            Login with Github
          </button>
          <section className='github' />
        </section>
      </section>
    </div>
  )
}
