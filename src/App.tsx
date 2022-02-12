import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Tree from './components/Tree';

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
