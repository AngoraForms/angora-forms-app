'use client';
import Link from 'next/link';
import Image from 'next/image';
import AngoraLogo from './angoralogo.png';
import { useState } from 'react';
import Default from './(FeelTheDifferenceComponents)/Default';
import AngoraForm from './(FeelTheDifferenceComponents)/AngoraForm';
import NPM from './(NPMComponents)/NPM';


export default function Home() {
  const [formType, setFormType] = useState('default');



  return (
    <article className="bg-primary relative mt-10 max-sm:pt-[160px]">
      <div className="absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[30.125rem] -translate-x-1/4 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[105.1875rem]"></div>
      </div>
      <div className="mx-10 relative z-10 flex justify-center text-center pb-30 border-b border-white max-sm:flex-col max-sm:h-screen">
        <div className="flex-1 my-40 max-sm:my-20 flex items-center justify-center content-center ">
          <Image
            className="w-1/2"
            src={AngoraLogo}
            alt="Angora Logo"
          />
        </div>
        <div className="flex-1 h-100 flex flex-col my-40 max-sm:my-20 items-center ">
          <h1 className="text-white text-6xl">Construct <br /> Angular <br /> Forms the <br /> Right Way</h1>
          <br/>
          <h6 className="text-base text-gray-400">Build Angular custom form components efficiently</h6>
          <br/>
          <div className="flex justify-evenly w-full max-sm:flex-col max-sm:items-center">
            <a href="https://www.npmjs.com/package/@angoraforms/angora-loader" className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 max-sm:w-1/3 rounded-lg">Get Started</a>
            <Link href="/docs"className="bg-transparent text-sm hover:bg-red-800 text-white hover:text-white py-3 px-4 border border-white max-sm:w-1/3 hover:border-transparent rounded-lg">See how it works</Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-medium text-6xl p-5 text-white mt-32 ">Feel the Difference</h2>
        <h2 className="font-medium text-xl pb-5 text-gray-400">Transform Your Custom Components From</h2>
        <button className="inline bg-transparent hover:bg-red-800 py-2 px-4 border border-black-700 rounded text-white" onClick={() => {setFormType('default');}}>Default Angular</button>
        <p className="inline mx-10 text-white">to</p>
        <button className="inline bg-white-500 hover:bg-red-800 py-2 px-4 rounded text-white bg-red-600" onClick={() => {setFormType('Angora');}}>Angora Forms</button>
      </div>

      <div className="bg-white mx-10 max-sm:mx-2 rounded-lg shadow-lg text-center border-8 border-double mt-10 mb-32">
      

        <div className="flex justify-center">
          {formType === 'default' ? <Default></Default> : <AngoraForm></AngoraForm>}
        </div>
      
      </div>
    
      <div className="absolute inset-x-0 z-0 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[30.125rem] -translate-x-1/4 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[80.1875rem]"></div>
      </div>
      <div className="relative z-10">
        <hr className="mx-10"></hr>

        <NPM className=""></NPM>
      </div>

    </article>
  );
}