'use client'
import React from "react"
import { useState } from "react"

export default function Sidebar ({files, handleSelectedFile}: any) {

    return (
        <div  className="bg-white m-5 rounded-lg">
            <ul>
                {files.map((file: any, index: number) => (
                    <button key={index} className="mt-10 hover:bg-gray-100 rounded-lg p-2 font-mono" onClick={() => handleSelectedFile(file)}>
                        {file.name}
                    </button>
                ))}
            </ul>
        </div>

    )

}