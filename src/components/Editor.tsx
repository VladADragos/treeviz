import React, { useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/worker-json";
import "ace-builds/src-noconflict/worker-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import * as AceTypes from "react-ace/lib/types";
import { Ace as AceBuildTypes } from "ace-builds/ace";
import useLocalStorage from '../hooks/LocalStorage';
import Split from 'react-split';
const options: AceTypes.IAceOptions = {
    // enableBasicAutocompletion: false,
    // showGutter: true,
    // enableLiveAutocompletion: false,
    // enableMultiselect: true,
    // enableSnippets: false,
    showLineNumbers: true,
    tabSize: 4,
    // showFoldWidgets: false,
    showPrintMargin: false,
    printMarginColumn: 50,
    // scrollPastEnd: true,
    scrollSpeed: 2,
    animatedScroll: true,
    hScrollBarAlwaysVisible: true,
    autoScrollEditorIntoView: false



}

interface Position {
    row: number,
    column: number
}
interface Props {
    getData: React.Dispatch<string>
}
interface Error {
    position: Position,
    message: string
}

interface ErrorsProps {
    errors: Error[]
}

interface TopProps {
    position: Position
}


const Errors: React.FC<ErrorsProps> = ({ errors }) => {
    return (
        <>
            {errors.map((error, index) => {
                return (<p className='text-slate-50' key={index}>ERROR: {error.message} at row: {error.position.row + 1}, column: {error.position.column + 1}</p>)
            })}
        </>
    )
}


const Top: React.FC<TopProps> = ({ position }) => {
    return <div className='bg-neutral-700 text-right pr-3 border-t-2 border-neutral-900 text-neutral-300'> row: {position.row}, column: {position.column}</div>
}

const initalState = {
    name: "root",
    children: [
        { name: "test1" },
        { name: "test2" },

    ]
}

const Editor: React.FC<Props> = ({ getData }) => {

    const [position, setPosition] = useState<Position>({ row: 0, column: 0 })
    const [editorText, setEditorText] = useLocalStorage("ace-editor-text", JSON.stringify(initalState));
    const [errors, setErrors] = useState<Error[]>([])
    // const [test, setSet] = 
    function handleErrors(error: AceBuildTypes.Annotation[]) {
        if (error.length > 0) {
            setErrors(
                error.map((el) => {
                    return { position: { column: el.column ? el.column : 0, row: el.row ? el.row : 0 }, message: el.text }
                }
                )
            )
        } else {
            setErrors([])
        }
    }

    function handleOnChange(value: string) {
        setEditorText(value)
        getData(value)
    }
    function handleFormat(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
            setEditorText(JSON.stringify(JSON.parse(editorText), null, 4))
        }
        console.log(e);
    }
    return (
        <div className='h-full testtest bg-stone-900'>


            <Split direction='vertical' sizes={[50, 50]} collapsed={50} minSize={[450, 0]} gutterSize={5} gutterAlign='center' className=' bg-stone-900 h-full' onKeyDown={(e) => handleFormat(e)}>
                <div className='bg-teal-300 toppane'>
                    <div className='h-full flex flex-col'>

                        <AceEditor
                            className=''
                            placeholder="Placeholder Text"
                            mode="json"
                            theme="monokai"
                            name="blah2"
                            height='100%'
                            width='100%'
                            onLoad={(e) => getData(editorText)}
                            onChange={(e) => handleOnChange(e)}
                            onValidate={(error) => handleErrors(error)}
                            onCursorChange={({ cursor }) => { setPosition({ column: cursor.column + 1, row: cursor.row + 1 }) }}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={editorText}
                            setOptions={options} />
                        <Top position={position} />
                    </div>
                </div>
                <div className=' bg-neutral-800 bottompane'>
                    <Errors errors={errors} />
                </div>

            </Split>
        </div>);
}
export default Editor;