import React, { useContext, useEffect, useState } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import EditorContext from "../context/EditorContext";
import EditorProvider from "../context/EditorProvider";
import { Spinner } from "@chakra-ui/react";
import Tree from "./Tree";

const initalState = {
    name: "root",
    children: [{ name: "test1" }, { name: "test2" }],
};
interface Props {
    onChange: React.Dispatch<EditorState>;
}

const Editor = ({ onChange }: Props) => {
    let m = useMonaco();
    const [text, setText] = useState("");
    const [errors, setErrors] = useState<EditorError[]>([]);
    function handleChange(t: string | undefined) {
        if (t !== undefined) {
            setText(t);
            onChange({ text: t, errors });
        }
    }

    function handleError(errors: any[]) {
        if (errors && errors.length > 0) {
            const e = errors.map((err) => {
                return { message: err.message, column: err.startLineNumber, row: err.startColumn };
            });
            setErrors(e);
        }
        onChange({ text, errors });
    }
    useEffect(() => {
        console.log("frist redenr");
        const text = JSON.stringify(initalState);
        console.log(m);
        setText(text);
        onChange({ text, errors });
    }, []);

    return (
        <Box flexGrow={0} flexShrink={1} flexBasis={"auto"}>
            <MonacoEditor
                options={{
                    tabSize: 4,
                    tabCompletion: "on",
                    columnSelection: true,
                    minimap: { enabled: false },
                    suggestSelection: "recentlyUsedByPrefix",
                }}
                loading={<Spinner size={"lg"} />}
                height={"90%"}
                width={"90%"}
                defaultLanguage="json"
                language="json"
                defaultValue=""
                theme="vs-dark"
                value={text}
                onChange={handleChange}
                onValidate={handleError}
            />
        </Box>
    );
};

export default Editor;
