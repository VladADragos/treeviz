import { atom } from "recoil";

const initalState = {
    name: "root",
    children: [
        { name: "test1" },
        { name: "test2" },

    ]
}

const EditorState = atom<EditorState>({ key: "EditorState", default: { text: JSON.stringify(initalState, null, 2), errors: [] } });

export default EditorState;