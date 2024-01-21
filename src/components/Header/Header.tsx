"use client";


import React, { useContext } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import ThemeContext from '@/context/themeContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


function Header() {
const {darkTheme, setDarkTheme} = useContext(ThemeContext);


const {data: session} = useSession();


  return (
    <header className='py-10 px-4 container mx-auto text-xl md:flex items-center justify-between'>
      <div className='flex items-center w-full md:w-2/3'>
        <Link href="/" className='font-black text-tertiary-dark'>
          Flamora
        </Link>
        <ul className="flex items-center ml-5">
          <li className='flex items-center'>
            {session?.user ? (
            <Link href={`/users/${session.user.id}`}>
              {session.user.image ?  (
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                  <Image 
                    src={session.user.image} 
                    alt={ session.user.name!}
                    width={40}
                    height={40}
                    className='scale-animation img'
                    />
                </div>
                ): (
                <FaUserCircle className='cursor-pointer'/>
                ) }
            </Link>
            ) : (
            <Link href="/auth">
              <FaUserCircle className='cursor-pointer'/>
            </Link>)}  
            {/* check if i had session */}
          </li>
          <li className='ml-2'>
            {darkTheme ?(
              <MdOutlineLightMode className='cursor-pointer' 
              onClick={() => {setDarkTheme(false);
              localStorage.removeItem('eshop-theme'); }} 
              /> 
              ) : (
            <MdDarkMode className='cursor-pointer' 
              onClick={() => {setDarkTheme(true);
              localStorage.setItem('eshop-theme', "true"); }} />
            )}
          </li>
        </ul>
      </div>

      <ul className='flex items-center justify-between w-full md:w-1/3 mt-4'>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/'>Acasă</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/products'>Produse</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/'>Contact</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/cart'><FaShoppingCart/></Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;


