'use client';
import React from 'react';

export default function Sidebar({ files, handleSelectedFile }: any) {
  return (
    <div className="bg-white m-5 rounded-lg col-span-1 max-xl:col-span-4">
      <ul className='justify-center text-center max-xl:flex-row'>
        {/* display the names of all the files. When the file is clicked on, call handleSelectedFile to change the selected file and display its contents */}
        {files.map((file: {name: string, content: string}, index: number) => (
          <button
            key={index}
            className="p-4 hover:bg-gray-100 rounded-lg font-mono underline"
            onClick={() => handleSelectedFile(file)}
          >
            {file.name}
          </button>
        ))}
      </ul>
    </div>
  );
}

