import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import controllers from '../../../lib/controllers';
import { useState } from 'react';

export default function AngoraBuilder() {
  const [code, setCode] = useState(`class CustomComponent {
  template = 'your html code'

  onChange = (value: any) => {};

  onTouched = () => {};

  value: any = 0;

  disabled = false
}`);

  return (
    <div
      className="inline-block relative p-2
    border border-black shadow-xl rounded-b-md 
    w-full min-h-[400px] overflow-auto resize-y"
    >
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <span
        onClick={(e) => controllers.copyCode(e)}
        className="material-symbols-outlined absolute top-2 right-2 duration-500 hover:text-red-700 hover:cursor-pointer"
      >
        content_paste
      </span>
    </div>
  );
}
