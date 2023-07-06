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
      <div className="relative z-10 flex max-lg:flex-col">
        <div className="my-40 ml-48 flex-1 order-1 max-lg:order-2 max-lg:mx-auto">
          <h1 className="text-white text-7xl">Construct <br /> Angular <br /> Forms the <br /> Right Way</h1>
          <br />
          <h6 className="text-sm text-gray-400">Build Angular custom form components efficiently</h6>
          <div className="mt-6">
            <a href="https://www.npmjs.com/package/@angoraforms/angora-loader" className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 rounded-lg mr-6">Get Started</a>
            <Link href="/docs"className="bg-transparent text-sm hover:bg-red-800 text-white hover:text-white py-3 px-4 border border-white hover:border-transparent rounded-lg">See how it works</Link>
          </div>
        </div>
        <div className="flex-1 flex items-center px-32 pb-10 mr-20 max-w-2xl order-2 min-w-[300px] max-lg:order-1 max-lg:mx-auto max-lg:px-0 max-lg:pt-40">
          <Image
            className="flex-1"
            src={AngoraLogo}
            alt="Angora Logo"
            style={{marginTop: '50px', width: '50px'}}
          />
        </div>
      </div>
      <hr className="mx-10"></hr>
      <div className="text-center">
        <h2 className="font-medium text-6xl p-5 text-white mt-32 ">Feel the Difference</h2>
        <h2 className="font-medium text-xl pb-5 text-gray-400">Transform Your Custom Form Components</h2>
        <button className="inline bg-transparent hover:bg-red-800 py-2 px-4 border border-black-700 rounded text-white" onClick={() => {setFormType('default');}}>Default Angular</button>
        <p className="inline mx-10 text-white">to</p>
        <button className="inline bg-white-500 hover:bg-red-800 py-2 px-4 rounded text-white bg-red-600" onClick={() => {setFormType('Angora');}}>with AngoraForms</button>
      </div>
      <div className="bg-white mx-10 rounded-lg shadow-lg text-center border-8 border-double mt-10 mb-32">
        <div className="flex justify-center">
          {formType === 'default' ? <Default />: <AngoraForm />}
        </div>
      </div>
      <div className="absolute inset-x-0 z-0 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1300/678] w-[30.125rem] -translate-x-1/4 rotate-[90deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[80.1875rem]"></div>
      </div>
      <div className="relative z-10">
        <hr className="mx-10"></hr>
        <NPM />
      </div>
    </article>
  );
}