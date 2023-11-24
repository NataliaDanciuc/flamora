"use client";


import React, { useContext } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import ThemeContext from '@/context/themeContext';

function Header() {
const {darkTheme, setDarkTheme} = useContext(ThemeContext)

  return (
    <header className='py-10 px-4 container mx-auto text-xl md:flex items-center justify-between'>
      <div className='flex items-center w-full md:w-2/3'>
        <Link href="/" className='font-black text-tertiary-dark'>
          Flamora
        </Link>
        <ul className="flex items-center ml-5">
          <li className='flex items-center'>
            <Link href="/auth">
              <FaUserCircle className='cursor-pointer'/>
            </Link>
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
          <Link href='/'>Home</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/products'>Products</Link>
        </li>
        <li className='hover:-translate-y-2 duration-500 transition-all'>
          <Link href='/'>Contact</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;


