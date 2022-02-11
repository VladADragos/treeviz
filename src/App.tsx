import {
	Box,
	extendTheme,
	Flex,
	Grid,
	GridItem,
	SimpleGrid,
	Stack
} from '@chakra-ui/react';
import initSwc, { transformSync } from '@swc/wasm-web';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Tree from './components/Tree';
import EditorText from './recoil/selectors/EditorText';

// import {MenuIcon} from 'hiero'

function App() {
	return (
		<>
			<Flex flexDir='column' h='100vh' bg='teal.500' wrap='nowrap'>
				<Navbar />
				<Flex flexGrow={1} overflow='hidden'>
					<Box flex={1} overflow='hidden'>
						<Editor />
					</Box>
					<Box flex={1}>
						<Tree />
					</Box>
				</Flex>
			</Flex>
		</>
	);
}

export default App;
