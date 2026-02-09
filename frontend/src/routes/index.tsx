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
    <div className='bg-linear-to-br from-zinc-950 to-indigo-800 h-full w-full flex justify-center items-center'>
      <section className="h-[85%] w-[35%] rounded-lg items-center
                          flex flex-col bg-zinc-950 shadow-2xl shadow-teal-700"
      >

        <span className="customfont flex justify-center items-center gap-2 text-5xl mt-5 text-red-500/50 mr-10 font-bold">
          <img src="/logo.jpg" alt="Logo" className="w-25 h-25 rounded-full text-red-600 border" />
          SynK
        </span>

        <hr className='h-[0.1rem] w-full bg-red-700 mt-4'/>

        <section className='flex flex-row border-red-700 border- mt-12 bg-zinc-900 h-18 w-45 justify-center items-center rounded-full gap-4 text-red-700'>
          <button onClick={() => {tryLogin('google')}} className='google text-white cursor-pointer'></button>
          google
        </section>

        <section className='flex flex-row border-red-700 border- mt-7 bg-zinc-900 h-18 w-45 justify-center items-center rounded-full gap-4 text-red-700'>
          <button onClick={() => {tryLogin('discord')}} className='discord text-white cursor-pointer'></button>
          discord
        </section>

        <section className='flex flex-row border-red-700 border- mt-7 bg-zinc-900 h-18 w-45 justify-center items-center rounded-full gap-4 text-red-700'>
          <button onClick={() => {tryLogin('github')}} className='github text-white cursor-pointer'></button>
          github
        </section>

        <hr className='h-[0.1rem] w-full bg-red-700 mt-10'/>

        <h1 className='text-red-400 opacity-50 text-center mt-13 text-lg'>- Login with one of the options above -</h1>
      </section>
    </div>
  )
}
