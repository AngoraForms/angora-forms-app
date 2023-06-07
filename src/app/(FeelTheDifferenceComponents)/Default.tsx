'use client';
import React from 'react';
import { useState } from 'react';

import Sidebar from './Sidebar';
import Code from './Code';

export default function Default(props: any) {
  const [selectedFile, setSelectedFile] = useState(null);

  // array of files that will be displayed under the 'Defualt Angular' option
  const files: Array<object> = [
    {
      name: 'FileUploadComponent.ts',
      content: `import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-file-upload',
    template: './FileUploadComponent.html',
    providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: hadarComp2
    }
    ]
})

export class hadarComp2 implements ControlValueAccessor {

    onChange = (value: string) => { }

    onTouched = () => { }

    value: string = ''

    disabled: boolean = false 

    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            this.value = file.name;
            console.log(this.value);
            this.onChange(this.value);
        }
    }

    onClick(fileUpload: HTMLInputElement) {
        this.onTouched();
        fileUpload.click();
    }

    writeValue(value: any) {
        this.value = value
    }
        
    registerOnChange(onChange: any) {
        this.onChange = onChange
    }
        
    registerOnTouched(onTouched: any){
        this.onTouched = onTouched
    }
        
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled
    }
}`,
    },
    {
      name: 'FileUploadComponent.html',
      content: `<input type="file" class="file-input" (change)="onFileSelected($event)" #fileUpload>

<div>
    <input class="form-control" [disabled]="true" [value]="value">
    <button class="btn btn-primary" (click)="onClick(fileUpload)" [disabled]="disabled">Attach File</button>
</div>`,
    },
    {
      name: 'NumberComponent.ts',
      content: `import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-number',
    template: './NumberComponent.html',
    providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: hadarComp1
    }
    ]
})

export class hadarComp1 implements ControlValueAccessor {

    onChange = (value: any) => { }

    onTouched = () => { }

    value = 0

    disabled = false 

    increment(num: any, scndNum: any) {
        num = 2;
        this.value++;
        this.onChange(this.value);
        this.onTouched();
    }

    decrement() {
        this.value--;
        this.onChange(this.value);
        this.onTouched();
    }

    writeValue(value: any) {
        this.value = value
    }
        
    registerOnChange(onChange: any) {
        this.onChange = onChange
    }
        
    registerOnTouched(onTouched: any){
        this.onTouched = onTouched
    }
        
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled
    }
}`,
    },
    {
      name: 'NumberComponent.html',
      content: `<h1>{{value}}</h1>
<button (click)='increment()'>Increment</button>
<button (click)='decrement()'>Decrement</button>`,
    },
  ];

  const handleSelectedFile: any = (file: any): void => {
    // set file to the file selected in the sidebar
    setSelectedFile(file);
  };

  return (
    <div className="grid grid-cols-4 m-10 bg-gray-100 rounded-lg shadow-xl
    max-sm:m-2 
    ">
      <Sidebar
        className="col-span-1"
        files={files}
        handleSelectedFile={handleSelectedFile}
      />
      <div className="col-start-2 col-span-3">
        {/* if file selected has a value, display the selected file, else display the first file in the array */}
        {selectedFile ? <Code file={selectedFile} /> : <Code file={files[0]} />}
      </div>
    </div>
  );
}
