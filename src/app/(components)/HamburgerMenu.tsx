'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HamburgerFunc } from '../../../lib/types';
import { deleteCookie } from 'cookies-next';
import router from 'next/router';

export default function HamburgerMenu (props: HamburgerFunc) {
  const { authenticated, setAuthenticated } = props;
  // logout function
  const logout = ():void =>  {
    deleteCookie('key');
    setAuthenticated('none');
    router.push('/');
  };
  //state for controlling the width of the modal and menu
  //default states is style object with width because we want sliding animation
  const [openMenu, setOpenMenu] = useState<{width:string}>({width: '0'});
  const [openModal, setOpenModal] = useState<{width:string}>({width: '0'});
  //when hamburger is clicked, we cover screen with modal and open menu
  const clickOpenMenu = ():void => {
    setOpenModal({width:'100%'});
    setOpenMenu({width:'50%'});
  };
  //when we click modal, we want to exit the menu
  const modalClick = (e:any) => {
    console.log(e.target.id);
    if (e.target.id === 'modal') {
      setOpenModal({width:'0%'});
      setOpenMenu({width:'0%'});
    }
  };
  return (
    <>
      <div className="hamburger-menu hidden flex-col justify-between w-6 h-4 cursor-pointer items-center
      max-md:flex"
      onClick={clickOpenMenu}>
        <div className="hamburger-line w-full h-0.5 bg-black transition-transform"></div>
        <div className="hamburger-line w-full h-0.5 bg-black transition-transform"></div>
        <div className="hamburger-line w-full h-0.5 bg-black transition-transform "></div>
      </div>
      <div style={openModal} id="modal" className='fixed top-0 left-0 bottom-0 bg-black bg-opacity-40  duration-500'
        onClick={(e) => modalClick(e)}>
        <div style={openMenu} className='fixed top-0 left-0 bottom-0 bg-white opacity-100 z-50 duration-500
          flex flex-col max-w-[500px] overflow-hidden'>
          <div className='text-4xl p-4 bg-primary text-white'>Menu</div>
          {/* depending on if we are loggined in or not menu will display diff things */}
          { authenticated === 'none' ? 
            <>
              <Link href="/" className="p-4 inline-block duration-300 hover:bg-gray-400">
                Home
              </Link>
              <Link href="/docs" className="p-4 inline-block duration-300 hover:bg-gray-400">
                Docs
              </Link>
              <Link href="/login" className="p-4 inline-block duration-300 hover:bg-gray-400">
                Login
              </Link>
              <Link href="/signup" className="p-4 inline-block duration-300 hover:bg-gray-400">
                Sign Up
              </Link>
            </> :
            <>
              <p className='p-4 inline-block text-center bg-gray-700 text-white font-bold'>Hello, {authenticated}</p>
              <Link href="/" className="p-4 duration-300 hover:bg-gray-400">Home</Link>
              <Link href="/docs" className="p-4 inline-block duration-300 hover:bg-gray-400">Docs</Link>
              <Link href="/componentBank" className="p-4 inline-block duration-300 hover:bg-gray-400">Component Bank</Link>
              <Link href="/FormBuilder" className="p-4 inline-block duration-300 hover:bg-gray-400">Form Builder</Link>
              <Link href="/" className="p-4 inline-block duration-300 hover:bg-gray-400" onClick={logout}>Log Out</Link>
            </> 

          }
        </div>
      </div>
    </>
  );
}