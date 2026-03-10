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
        <nav className='h-[6%] w-[100vw] bg-[#C4956A] flex flex-row rounded-md text-white border-b border-[#2C2118]'>
            <section className='w-[40%] h-[100%] flex flex-row justify-center items-center'>
              <span className='customfont2 font-bold text-[#2C2118] text-lg'>{session?.user.name + "🖤"}</span>
            </section>
            <section className='w-[60%] flex flex-row justify-center items-center gap-10'>
              <Link to={linkOne} className='h-[80%] w-35 flex justify-center items-center border-1 border-[#7A5C3E] rounded-lg text-[#2C2118] text-bold customfont2'>
                {um}
              </Link>
              <Link to={linkTwo} className='h-[80%] w-35 flex justify-center items-center border-1 border-[#7A5C3E] rounded-lg text-[#2C2118] text-bold customfont2'>
                {dois}
              </Link>
            </section>  
        </nav>
        </>
    )
}