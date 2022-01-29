import React, { createContext } from "react";

const EditorContext: React.Context<EditorState> = createContext({ text: "", errors: [] as EditorError[] })

export default EditorContext;