/* eslint-disable react/react-in-jsx-scope */
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
    <article className="bg-primary relative mt-10">
  <div className="absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[30.125rem] -translate-x-1/4 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[105.1875rem]"></div>
  </div>
  <div className="relative z-10 flex">
    <div className="my-40 ml-48 flex-1">
      <h1 className="text-white text-7xl">Construct <br /> Angular <br /> Forms the <br /> Right Way</h1>
      <br />
      <h6 className="text-sm text-gray-400">Build Angular custom form components efficiently</h6>
      <div className="mt-6">
        <a href="https://www.npmjs.com/package/@angoraforms/angora-loader" className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 rounded-lg mr-6">Get Started</a>
        <Link href="/docs"className="bg-transparent text-sm hover:bg-red-800 text-white hover:text-white py-3 px-4 border border-white hover:border-transparent rounded-lg">See how it works</Link>
      </div>

      <div className="bg-white mx-10 rounded-lg shadow-lg text-center border-8 border-double mt-10 mb-32">
      

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
