import { createFileRoute} from '@tanstack/react-router'
import {authClient} from '../lib/auth-client'
import {rateLimit, throttle} from '@tanstack/react-pacer'
import { useEffect } from 'react';

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

  useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('error')) {
    authClient.getSession().then((session) => {
      if (session.data) {
        window.location.href = '/console/dashboard'
      }
    })
  }
}, [])

  return (
    <div className='bg-[#F4EAE0]/80 h-full w-full flex justify-center items-center'>
      <section className="h-[75%] md:w-[50%] w-full rounded-lg items-center
                          flex flex-col bg-[#E8D8C4] shadow-2xl shadow-[#2C2118]"
      >

        <span className="customfont2 flex justify-center items-center gap-2 text-5xl mt-5 text-[#7A5C3E] font-bold text-center">
          {'Synk' + '🖤'}
        </span>

        <hr className='h-[0.1rem] w-full bg-[#2C2118] mt-4'/>

        <section className='flex flex-row mt-12 bg-[#C4956A] h-18 w-45 justify-center items-center rounded-full gap-4 text-bold text-[#2C2118]'>
          <button onClick={() => {tryLogin('google')}} className='google text-white cursor-pointer'></button>
          google
        </section>

        <section className='flex flex-row mt-7 bg-[#C4956A] h-18 w-45 justify-center items-center rounded-full gap-4 text-bold text-[#2C2118]'>
          <button onClick={() => {tryLogin('discord')}} className='discord text-white cursor-pointer'></button>
          discord
        </section>

        <section className='flex flex-row mt-7 bg-[#C4956A] h-18 w-45 justify-center items-center rounded-full gap-4 text-bold text-[#2C2118]'>
          <button onClick={() => {tryLogin('github')}} className='github text-white cursor-pointer'></button>
          github
        </section>

        <hr className='h-[0.1rem] w-full bg-[#2C2118] mt-10'/>

        <h1 className='text-[#7A5C3E] text-center mt-13 text-lg'>- Login with one of the options above -</h1>
      </section>
    </div>
  )
}
