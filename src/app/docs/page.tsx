'use client'
import React from "react"
import { useState } from "react"
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

export default function () {

    const webpackConfig = 
`const path = require("path");
const customComponents = require('local path to your custom components file')

module.exports = {
    mode: "development",
    entry: ["./src/main.ts"],
    output: {
    filename: "main.js", 
    path: path.resolve(__dirname, "dist"), 
    },
    devtool: false,
    module: {
    rules: [
        {
        test: /\\.ts$/, 
        use: [
            {
            loader: "angora-loader",
            options: {
                customComponents: customComponents
            }
            },
        ],
        },
    ],
    },
};`

const CustomComponent = 
`class CustomComponent {
    template = 'your html code'
  
    onChange = (value: any) => {};
  
    onTouched = () => {};
  
    value: any = 0;
  
    disabled = false
  }`

const HTML = 
`<h1>{{value}}</h1>
<button (click)='increment()'>Increment</button>
<button (click)='decrement()'>Decrement</button>`

const increment = 
`increment() {
    this.value++;
    this.onChange(this.value);
    this.onTouched();
}`

const incrementDisabled =
`increment() {
    this.value++;
    this.onChange(this.value);
    this.onTouched();
    if (this.value === 5) {
        this.disabled = true
    }
}`

const fullExample = 
`class CustomComponent {
    template = \`
          <h1>{{value}}</h1>
          <button (click)='increment()'>Increment</button>
          <button (click)='decrement()'>Decrement</button>
      \`;
  
    onChange = (value: any) => {};
  
    onTouched = () => {};
  
    value = 0;
  
    disabled = false
  
    increment() {
      this.value++;
      this.onChange(this.value);
      this.onTouched();
    }
  
    decrement() {
      this.value--;
      this.onChange(this.value);
      this.onTouched();
    }
  }
  
  module.exports = [CustomComponent]`



    return (
        <article className="bg-primary">
            <section className="flex flex-col items-center justify-center bg-primary mt-20">
                <div className="bg-white rounded-lg p-5 mt-5 w-3/4 mt-10">
                    <h1 className="text-2xl">Instructions</h1>
                    <br></br>
                    <p className="text-xl">After completing the steps below, before using 'ng serve' to generate your Angular webpage, run 'npx webpack' to generate your custom components.</p>
                    <br></br>
                    <p className="text-xl">Reference custom component in your own form using class name Kebab Cased</p>
                    <SyntaxHighlighter language="typescript">{`<custom-component></custom-component>`}</SyntaxHighlighter>
                </div>
                <div className="bg-white rounded-lg p-5 mt-5 w-3/4 mt-10">
                    <h1 className="text-2xl">WebpackConfig.ts</h1>
                    <SyntaxHighlighter language="typescript">{webpackConfig}</SyntaxHighlighter>
                    <p className="text-xl">Create a webpack.config.ts file in the root directory of your project and follow the structure above</p>
                </div>
                <div className="bg-white rounded-lg p-5 mt-5 w-3/4">
                    <h1 className="text-2xl">Custom Components Page</h1>
                    <p className="text-xl">Required Items</p>
                    <SyntaxHighlighter language="typescript">{CustomComponent}</SyntaxHighlighter>
                    <ul>
                    <hr></hr>
                        <li className='m-5'>
                            <span className="text-xl">Template</span><br></br> Include all html code in backticks (``) in the template property.
                            <SyntaxHighlighter language="typescript">{HTML}</SyntaxHighlighter>

                        </li>
                        <hr></hr>
                        <li className='m-5'>
                            <span className="text-xl">OnChange</span> <br></br>
                            Invoke onChange passing in value as the argument every time value changes.
                            <SyntaxHighlighter language="typescript">{`<button (click)='increment()'>Increment</button>`}</SyntaxHighlighter>
                            <SyntaxHighlighter language="typescript">{increment}</SyntaxHighlighter>
                        </li>
                        <hr></hr>
                        <li className='m-5'>
                            <span className="text-xl">OnTouched</span> <br></br> Invoke onTouched when the user interacts with the form component.
                            <SyntaxHighlighter language="typescript">{`<button (click)='increment()'>Increment</button>`}</SyntaxHighlighter>
                            <SyntaxHighlighter language="typescript">{increment}</SyntaxHighlighter>
                        </li>
                        <hr></hr>
                        <li className='m-5'>
                            <span className="text-xl">Value</span> <br></br> Set equal the value of the form component inside custom functionality. When changed invoke OnChange.
                            <SyntaxHighlighter language="typescript">{`<h1>{{value}}</h1>`}</SyntaxHighlighter>
                            <SyntaxHighlighter language="typescript">{increment}</SyntaxHighlighter>
                        </li>
                        <hr></hr>
                        <li className='m-5'>
                            <span className="text-xl">Disabled</span> <br></br> Set equal to the disabled property in the HTML code for inputs/buttons. Determines whether inputs/buttons are disabled. Set to false to enable. Set to true to disable.
                            <SyntaxHighlighter language="typescript">{`<button (click)='increment()' [disabled]="disabled">Increment</button>`}</SyntaxHighlighter>
                            <SyntaxHighlighter language="typescript">{incrementDisabled}</SyntaxHighlighter>
                            (If value is equal to 5 disable the button)
                        </li>
                        <hr></hr>
                        <li className="m-5">
                            <span className="text-xl">Export</span> <br></br> Export your customComponent/s using module.exports
                            <SyntaxHighlighter language="typescript">{`module.exports = [CustomComponent]`}</SyntaxHighlighter>
                        </li>
                        <hr></hr>
                        <li className='m-5'>
                            Write additional code (properties and/or functions) to provide custom functionality.
                        </li>
                        <hr></hr>
                    </ul>
                </div>
                <div className="bg-white rounded-lg p-5 mt-5 w-3/4 mt-10 mb-10">
                    <h2 className="text-2xl">Full Example:</h2>
                    <SyntaxHighlighter language="typescript">{fullExample}</SyntaxHighlighter>
                </div>
            </section>
        </article>
    )
}