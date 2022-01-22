import React, { useState } from 'react';
import Tree from 'react-d3-tree'
import Editor from './Editor';
const initalState = {
  name: "root",
  children: [
    { name: "test1" },
    { name: "test2" },

  ]
}

function App() {


  const [editorString, setEditorString] = useState<string>("");

  function test() {
    let x = { name: "json error" };
    try {
      x = JSON.parse(editorString);
    } catch (error) {
    }

    return x;
  }

  return (
    <div className="App">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="right h-full bg-slate-300 flex-1">
          <Editor getData={setEditorString} />
        </div>
        <div className="left h-full bg-red-600 flex-1">
          <Tree data={test()} translate={{ x: 250, y: 330 }} />

        </div>
      </div>
    </div>
  );
}

export default App;
