"use client"
import Link from "next/link";
import Image from "next/image";
import AngoraLogo from "./angoralogo.png"
import { useState } from "react";
import Default from "./(splashComponents)/Default"
import AngoraForm from "./(splashComponents)/AngoraForm";


export default function Home() {
  const [formType, setFormType] = useState('default')



  return (
    <article className="bg-primary">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[40.125rem] -translate-x-1/4 rotate-[100deg] bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[150.1875rem]" ></div>
    </div>
      <div className="inline-flex">
      <div className="my-40 mx-48 flex-1">
        <h1 className="text-white text-7xl">Construct <br></br> Angular <br></br> Forms the <br></br> Right Way</h1>
        <br></br>
        <h6 className="text-sm text-gray-400">Build Angular custom form components efficiently</h6>
        <div className="mt-6">
          <button className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 rounded-lg mr-6">Get Started</button>
          <button className="bg-transparent text-sm hover:bg-red-800 text-white hover:text-white py-3 px-4 border border-white hover:border-transparent rounded-lg">See how it works</button>
        </div>
      </div>
      <div className="flex-1" >
        <Image
        src={AngoraLogo}
        width={3000}
        height={3000}
        alt="Angora Logo"
        // layout="fill"
        // sizes="50vw"
        />
      </div>
    </div>
    <hr className="mx-10"></hr>
    <div className="text-center">
      <h2 className="font-medium text-6xl p-5 text-white mt-32 ">Feel the Difference</h2>
      <h2 className="font-medium text-xl pb-5 text-gray-400">Transform Your Custom Components From</h2>
      <button className="inline bg-transparent hover:bg-red-800 py-2 px-4 border border-black-700 rounded text-white" onClick={() => {setFormType('default')}}>Default Angular</button>
      <p className="inline mx-10 text-white">to</p>
      <button className="inline bg-white-500 hover:bg-red-800 py-2 px-4 rounded text-white bg-red-600" onClick={() => {setFormType('Angora')}}>Angora Forms</button>
    </div>

    <div className="bg-white mx-40 rounded-lg shadow-lg text-center border-8 border-double mt-10 mb-32">
      

      <div className="flex justify-center">
        {formType === 'default' ? <Default></Default> : <AngoraForm></AngoraForm>}
      </div>
      
    </div>
    <hr className="mx-10"></hr>
    </article>
  )
}
