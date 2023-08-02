'use client';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; 
import controllers from '../../../lib/controllers';

export default function AngoraBank () {
  return (
    <div className='mt-[140px]'>
      <Editor
        className="border-2 bg-gray-100 rounded-md w-full min-h-[400px] duration-500 hover:border-red-400"
        value={`dsad`}
        onValueChange={() => null}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <span
        onClick={(e) => controllers.copyCode(e)}
        className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-red-400 hover: cursor-pointer"
      >
        content_paste
      </span>
    </div>
  )
}