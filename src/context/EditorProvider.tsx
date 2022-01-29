

import React from 'react';
import EditorContext from './EditorContext';
interface EditorProviderProps {
    value: EditorState,
    children: React.ReactChild

}
const EditorProvider = ({ value, children }: EditorProviderProps) => {
    return <EditorContext.Provider value={value}>{children} </EditorContext.Provider>;
};

export default EditorProvider;
