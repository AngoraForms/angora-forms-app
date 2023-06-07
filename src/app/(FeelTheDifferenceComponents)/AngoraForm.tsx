'use client';
import React from 'react';
import { useState } from 'react';

import Sidebar from './Sidebar';
import Code from './Code';

export default function AngoraForm(props: any) {
  const [selectedFile, setSelectedFile] = useState(null);

  // array of files that will be displayed under the 'Angora Forms' option
  const files: Array<object> = [
    {
      name: 'CustomComponents.ts',
      content: `class FileUploadComponent {
    template = '
        <input type="file" class="file-input" (change)="onFileSelected($event)" #fileUpload>

        <div>
            <input class="form-control" [disabled]="true" [value]="value">
            <button class="btn btn-primary" (click)="onClick(fileUpload)" [disabled]="disabled">Attach File</button>
        </div>
    ';

    onChange = (value: string) => {};

    onTouched = () => {};

    value: string = '';

    disabled: boolean = false;

    onFileSelected(event): void {
        const file = event.target.files[0];
        if (file) {
        this.value = file.name;
        console.log(this.value);
        this.onChange(this.value);
        }
    }

    onClick(fileUpload: HTMLInputElement): void {
        this.onTouched();
        fileUpload.click();
    }
}


class NumberComponent {
    template = '
        <h1>{{value}}</h1>
        <button (click)='increment()'>Increment</button>
        <button (click)='decrement()'>Decrement</button>
    ';

    onChange = (value: number): void => {};

    onTouched = (): void => {};

    value: number = 0;

    disabled: boolean = false

    increment(): void {
        this.value++;
        this.onChange(this.value);
        this.onTouched();
    }

    decrement(): void {
        this.value--;
        this.onChange(this.value);
        this.onTouched();
    }
}


module.exports = [FileUploadComponent, NumberComponent]`,
    },
  ];

  const handleSelectedFile: any = (file: any): void => {
    setSelectedFile(file);
  };

  return (
    <div className="grid grid-cols-4 m-10 bg-gray-100 rounded-lg shadow-xl">
      <Sidebar
        className="col-span-1"
        files={files}
        handleSelectedFile={handleSelectedFile}
      />
      <div className="col-start-2 col-span-3">
        {selectedFile ? (
          <Code className="flex-1" file={selectedFile} />
        ) : (
          <Code className="flex-1" file={files[0]} />
        )}
      </div>
    </div>
  );
}

}