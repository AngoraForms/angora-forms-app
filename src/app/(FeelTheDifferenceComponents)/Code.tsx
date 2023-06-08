'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { isblEditorLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code({ file }: any) {
  return (
    // display the code for the current selected file using react-syntax-highlighter
    <SyntaxHighlighter
      className="m-5 rounded-lg text-left"
      showLineNumbers={true}
      style={isblEditorLight}
      language="typescript"
    >
      {file.content}
    </SyntaxHighlighter>
  );
// }

