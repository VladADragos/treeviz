import React, { useState } from 'react';
import useLocalStorage from '../hooks/LocalStorage';
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import Split from 'react-split';
import { useRecoilState } from 'recoil';
import EditorState from '../recoil/atoms/EditorState';
import { ChevronDownIcon, ArrowsExpandIcon } from '@heroicons/react/solid';

interface Props {

}

interface ErrorsProps {
    errors: EditorError[]
}

interface BarProps {
    position: Position,
    onCollapse: () => void,
    collapsed: boolean
}


const Errors: React.FC<ErrorsProps> = ({ errors }) => {
    return (
        <div className=' bg-neutral-800 bottompane'>
            {errors.map((error, index) => {
                return (<p className='text-slate-50' key={index}>ERROR: {error.message} at row: {error.position.row}, column: {error.position.column}</p>)
            })}
        </div>
    )
}


const Bar: React.FC<BarProps> = ({ position, onCollapse, collapsed }) => {
    return (
        <div className='bg-neutral-700 flex items-center justify-between pr-3 border-t-2 border-neutral-900 text-neutral-300'>
            <button className='p-1 hover:bg-neutral-900' onClick={onCollapse}>
                {collapsed ? <ChevronDownIcon className='h-5 w-5 text-neutral-300' /> : <ArrowsExpandIcon className='h-5 w-5 text-neutral-300' />}
            </button>  row: {position.row}, column: {position.column}
        </div >)
}



const Editor: React.FC<Props> = () => {

    const [position, setPosition] = useState<Position>({ row: 0, column: 0 })
    const [editorState, setEditorState] = useRecoilState(EditorState);
    const [showErrors, setShowErrors] = useState(true);
    function handleErrors(error: any) {
        if (error.length > 0) {
            setEditorState({
                ...editorState, errors:
                    error.map(({ message, endColumn, endLineNumber }: { message: string, endColumn: number, endLineNumber: number }) => {
                        return { position: { column: endColumn, row: endLineNumber }, message: message }
                    }
                    )
            }
            )
        } else {
            setEditorState({ ...editorState, errors: [] });
        }
    }

    function handleOnChange(text: string) {
        setEditorState({ ...editorState, text });
    }

    function bindClass(state: boolean, cssClass: string): string {
        return state ? cssClass : "";
    }
    function useClassNames(...args: string[]): string {
        return args.join(" ");
    }
    return (
        <div className=' bg-stone-900 grid grid-rows-3'>
            <div className={useClassNames('flex flex-col', showErrors ? 'row-span-2' : 'row-span-3')}>
                <div className='h-full bg-[#1e1e1e]'>

                    <MonacoEditor
                        onMount={(editor) => { editor.onDidChangeCursorPosition(e => setPosition({ row: e.position.lineNumber, column: e.position.column })) }}
                        options={{
                            tabSize: 4,
                            tabCompletion: "on",
                            columnSelection: true,
                            minimap: { enabled: false },
                            suggestSelection: "recentlyUsedByPrefix",

                        }}
                        height={"90%"}
                        width={"100%"}
                        defaultLanguage="json"
                        language="json"
                        defaultValue=""
                        theme="vs-dark"
                        value={editorState.text}
                        onChange={(s) => { if (s) handleOnChange(s) }}
                        onValidate={(e) => {
                            handleErrors(e);
                        }}
                    />
                </div>
                {/* todo fix names, collapse showErrors, maybe figure out a better way to handle the state */}
                <Bar position={position} collapsed={showErrors} onCollapse={() => setShowErrors(!showErrors)} />
            </div>
            {
                showErrors && <Errors errors={editorState.errors} />
            }



        </div>);
}
export default Editor;