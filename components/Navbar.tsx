import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'

const Navbar = async () => {
    const session: any = await auth();
    
    console.log("session :: ", session);

    const loginHandler = async () => {
        "use server";
        await signIn('github')
    }

    const logoutHandler = async () => {
        "use server";
        await signOut();
    }

    return (
        <header className='px-5 py-3 bg-white shadow-sm forn-work-sans'>
            <nav className="flex justify-between items-center text-black">
                <Link href="/" className='flex justify-between items-center gap-3'>
                    <Image src="/next_logo.png" width={40} height={40} alt='logo' className='rounded-full'/>
                    <h1 className='text-2xl'>React App</h1>
                </Link>
                <div className="flex items-center gap-5 ">
                    {
                        (session && session?.user)
                            ? (
                                <>
                                    <Link href="/startup/create">
                                        <span>Create</span>
                                    </Link>

                                    <Link href={`/user/${session?.user?.name}`}>
                                        <span>{session?.user?.name}</span>
                                    </Link>

                                    <form action={logoutHandler}>
                                        <button type='submit'>
                                            <span>Logout</span>
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <form action={loginHandler}>
                                    <button type='submit'>
                                        <span>Login</span>
                                    </button>
                                </form>
                            )
                    }
                </div>

            </nav>
        </header>
    )
}

export default Navbar