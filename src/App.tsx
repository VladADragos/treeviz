import { useState } from 'react'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import Editor from './components/Editor'
import Tree from './components/Tree'
import EditorContext from './context/EditorContext'
import EditorProvider from './context/EditorProvider'
function App() {
  const [value, setValue] = useState<EditorState>({ text: "", errors: [] });
  return (

    <EditorProvider value={value}>
      <SimpleGrid columns={2} spacing={0} backgroundColor={"gray.500"} height={"100vh"} >
        <Editor onChange={(t) => setValue(t)} />
        <Tree />
      </SimpleGrid>
    </EditorProvider>

  )
}

export default App
