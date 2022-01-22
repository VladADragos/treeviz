import React, { useState } from 'react';
import AceEditor from "react-ace"
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/worker-json";
import "ace-builds/src-noconflict/worker-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import * as AceTypes from "react-ace/lib/types"
import { Ace as AceBuildTypes } from "ace-builds/ace"
const options: AceTypes.IAceOptions = {
    enableBasicAutocompletion: false,
    showGutter: true,
    enableLiveAutocompletion: false,
    enableMultiselect: true,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
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
type Nullable<T> = T | null

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
                return (<div key={index}>ERROR: {error.message} at row: {error.position.row + 1}, column: {error.position.column + 1}</div>)
            })}
        </>
    )
}


const Top: React.FC<TopProps> = ({ position }) => {
    return <div>row: {position.row}, column: {position.column}</div>
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
    const [editorText, setEditorText] = useState<string>(() => JSON.stringify(initalState))
    const [errors, setErrors] = useState<Error[]>([])

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
    return (
        <div className='editor-container'>
            {/* Row and Column */}
            <Top position={position} />
            {/* Editor */}
            <AceEditor
                placeholder="Placeholder Text"
                mode="json"
                theme="monokai"
                name="blah2"
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

            {/* errors   */}
            <Errors errors={errors} />

        </div>);
}
export default Editor;