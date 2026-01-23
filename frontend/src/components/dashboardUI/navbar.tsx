import { Link } from "@tanstack/react-router"
import { useState, useEffect } from "react";
import {authClient} from '../../lib/auth-client'
import { Session } from '@/types/session'

interface NavProps{
    um?: string
    dois?: string
    linkOne: string
    linkTwo: string
}



export function NavbarComponent({um, dois, linkOne, linkTwo}: NavProps){

    const [session, setSession] = useState<Session | null>(null); // <Session> esta vindo do import de types/session.ts

    async function fetchSession(){
        const {data} = await authClient.getSession();
        setSession(data);
    }

    useEffect (() => {
      fetchSession();
    }, [])

    return(
        <>
        <nav className='h-[8.5%] w-[100vw] bg-zinc-950 flex flex-row rounded-md text-white border-b border-red-700'>
            <section className='w-[40%] h-[100%] flex flex-row justify-center items-center'>
              <span className='font-bold text-red-700 text-lg'>{session?.user.name + "🦦"}</span>
            </section>
            <section className='w-[60%] flex flex-row justify-center items-center gap-10'>
              <Link to={linkOne} className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
                {um}
              </Link>
              <Link to={linkTwo} className='h-10 w-35 flex justify-center items-center bg-zinc-900 border rounded-lg text-white'>
                {dois}
              </Link>
            </section>  
        </nav>
        </>
    )
}