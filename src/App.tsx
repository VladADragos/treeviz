import React, { useState } from 'react';
import logo from './logo.svg';
import Tree from 'react-d3-tree'
import Editor from './Editor';

const data = {
  name: "root",
  children: [
    { name: "test" },
    { name: "test2" },

  ]
}
function App() {
  let [state, setState] = useState<any>(() => JSON.stringify(data))
  let [error, setError] = useState<string>("");
  let [treeData, setTreeData] = useState<any>(() => {
    try {
      let x = JSON.parse(state);
      return x;
    } catch (error) {
      return {}
    }
  })

  console.log("rerender")
  function update(newState: string) {


    // let parsed = treeData;
    setState(newState);
    try {
      let parsed = JSON.parse(newState);
      setTreeData(parsed);
      setError("");
    } catch (error: any) {
      let err = error as SyntaxError;
      setError(err.message);
      console.error(err.message)
    }
    // setTreeData(parsed);
  }

  return (
    <div className="App">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="right h-full bg-slate-300 flex-1">
          {!(error === "") && <div>{error}</div>}
          <Editor mutator={update} code={state} />
        </div>
        <div className="left h-full bg-red-600 flex-1">
          <Tree data={treeData} translate={{ x: 250, y: 330 }} />

        </div>
      </div>
    </div>
  );
}

export default App;
