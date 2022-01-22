import React, { useState } from 'react';
import Tree from 'react-d3-tree'
import Editor from './components/Editor';
import Split from 'react-split';

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

        <div className="header  bg-neutral-800">
          <h1 className='py-3 pl-3 text-xl text-slate-100'>Treeviz</h1>
        </div>

        <Split
          gutterSize={5}
          // minSize={500}
          direction='horizontal'
          sizes={[50, 50]}
          collapsed={500}
          className='flex flex-1'
        >

          <Editor getData={setEditorString} />

          <div className="left h-full bg-slate-300 ">
            <Tree data={test()} translate={{ x: 250, y: 330 }} />
          </div>
        </Split>




      </div>
    </div>
  );
}

export default App;
