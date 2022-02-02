import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Split from 'react-split';
import Tree from './components/Tree';

import initSwc, { transformSync } from "@swc/wasm-web";
import { useRecoilValue } from 'recoil';
import EditorText from './recoil/selectors/EditorText';




import { MenuIcon, ChevronDownIcon } from '@heroicons/react/solid';


export const Navbar = () => {
  return (<div className="header  bg-neutral-800 flex items-center justify-between py-3 px-3">
    <h1 className=' text-xl text-slate-100'>Treeviz </h1> <button className='hover:bg-neutral-700 '><MenuIcon className='m-2 h-5 w-5 text-slate-100 ' /></button>
  </div>)
};



function App() {

  const [initialized, setInitialized] = useState(false);
  const editorText = useRecoilValue(EditorText)
  const [res, setRes] = useState<any>(null);



  useEffect(() => {
    console.log("render");
  })
  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      setInitialized(true);
    }
    importAndRunSwcOnMount();
  }, []);
  function compile() {
    if (!initialized) {
      return;
    }

    const { code } = transformSync(editorText, {});
    setRes(eval(code))
  }


  return (
    <div className="App">
      <div className="h-screen w-screen flex flex-col">

        <Navbar />

        <Split
          gutterSize={5}
          // minSize={500}
          direction='horizontal'
          sizes={[50, 50]}
          collapsed={500}
          className='flex flex-1'
        >

          <Editor />

          <div className="left h-full bg-slate-300 ">
            <Tree />
          </div>
        </Split>




      </div>
    </div>
  );
}

export default App;
