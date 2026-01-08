import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import {authClient} from '../lib/auth-client'
import { useState} from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})


function RouteComponent() {
  const getRedirectURL = () => window.location.origin + "/console/dashboard";

  const handleLoginGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: getRedirectURL(),
    });

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  const handleLoginDiscord = async () => {
    const data = await authClient.signIn.social({

      provider: "discord",
      callbackURL: getRedirectURL(),
    });

    console.log("teste")

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  const handleLoginGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: getRedirectURL(),
    });

    if(data.error){
      alert(data.error.message)
      return
    }
  };

  


  return (
    <div className='bg-zinc-800 h-full w-full flex justify-center items-center'>
      <section className="h-[85%] w-[35%] border-1 border-red-500 rounded-lg justify-center items-center
                          flex flex-col bg-zinc-900/50 shadow-2xl shadow-red-500"
      >

        <h1 className="text-red-700 text-3xl mb-20">Login🦥</h1>
 
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5 mt-10'>
          <button onClick={handleLoginGoogle} className='text-white'>
            Login with Google
          </button>
          <section className='google' />
        </section>
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5'>
          <button onClick={handleLoginDiscord} className='text-white'>
            Login with Discord
          </button>
          <section className='discord' />
        </section>
        <section className='flex flex-row gap-6 mt-10 bg-zinc-900 h-15 w-90 justify-center items-center rounded-lg p-5'>
          <button onClick={handleLoginGithub} className='text-white'>
            Login with Github
          </button>
          <section className='github' />
        </section>
      </section>
    </div>
  )
}
