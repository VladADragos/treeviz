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
      <div className="h-screen w-screen flex flex-col">

        <div className="header  bg-stone-800">
          <h1 className='py-3 pl-3 text-xl text-slate-100'>Treeviz</h1>
        </div>
        <div className='flex h-full'>

          <div className="right h-full bg-slate-300 flex-1 ">
            <Editor getData={setEditorString} />
          </div>
          <div className="left h-full bg-stone-50 flex-1">
            <Tree data={test()} translate={{ x: 250, y: 330 }} />
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
