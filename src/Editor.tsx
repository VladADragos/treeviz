import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/json-lint'
import CodeMirror from 'react-codemirror2'
import { Controlled } from 'react-codemirror2'


const options = { lineWrapping: true, mode: "javascript", theme: "material", lineNumbers: true, lint: true, gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"] }


interface Props {
    mutator: React.Dispatch<any>,
    code: string
}
export default function Editor({ mutator, code }: Props) {
    const initalState = {
        name: "root",
        children: [
            { name: "test" },
            { name: "test2" },

        ]
    }

    return (
        <div className='editor-container'>
            <Controlled value={code} onBeforeChange={(editor: any, data: any, value: any) => { mutator(value); }} onChange={(e) => { }} options={options} />
        </div>);
}
