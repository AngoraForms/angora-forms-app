'use client'
import React from "react"
import { useState } from "react"
import NPMLogo from './npm-logo.png'
import Image from "next/image";

export default function NPM (props: any) {

    const imageStyle = {
       
    }

    return (
        <section className="flex">
            <div className="ml-48 mt-32 flex-1">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="bg-gradient-to-tr from-[#FF0000] to-[#670000] opacity-30" ></div>
        </div>
        
        <Image
        src={NPMLogo}
        width={500}
        height={3000}
        alt="NPM Logo"
        style={imageStyle}
        />
        <h2 className="text-6xl mt-10 text-white">How To Use Our Package</h2>
        <h6 className="text-gray-400 mt-5">3 Simple Steps to Solving Your Form Building Problems</h6>
        <div className="mt-6">
          <button className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 rounded-lg mr-6">NPM Package</button>
          <button className="bg-red-700 text-sm hover:bg-red-800 text-white py-3 px-4 rounded-lg mr-6">See how it works</button>
        </div>
        </div>
        <div className="mx-48 mt-32 p-5 flex-1 flex flex-col justify-evenly">
            <div className="flex-1 bg-white rounded-lg mb-5 shadow-3xl">
                <h3 className="text-red-700 text-3xl p-5">Step One</h3>
                <p className="pb-5 pl-5">NPM Install @AngoraForms</p>
            </div>
            <div className="flex-1 bg-white rounded-lg mb-5 shadow-3xl">
                <h3 className="text-red-700 text-3xl p-5">Step Two</h3>
                <p className="pb-5 pl-5">Consult our docs to correctly configure your Angular application</p>
            </div>
            <div className="flex-1 bg-white rounded-lg mb-5 shadow-3xl">
                <h3 className="text-red-700 text-3xl p-5">Step Three</h3>
                <p className="pb-5 pl-5">Concisely write your custom form components all in one file!</p>
            </div>
        </div>
        </section>
    )
}