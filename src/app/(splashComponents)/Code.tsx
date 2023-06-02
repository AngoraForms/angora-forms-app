'use client'
import React from "react"
import { useState } from "react"
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { isblEditorLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
// import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'



export default function Code ({file}: any) {

    return (
        <SyntaxHighlighter className="m-5 rounded-lg text-left" wrapLines={true} wrapLongLines={false} showLineNumbers={true} style={ isblEditorLight } language="typescript">
            {file.content}
        </SyntaxHighlighter>
    )
}