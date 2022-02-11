import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import initSwc, { transformSync } from '@swc/wasm-web';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Tree from './components/Tree';
import EditorText from './recoil/selectors/EditorText';
// import {MenuIcon} from 'hiero'

function App() {
	const [initialized, setInitialized] = useState(false);
	const editorText = useRecoilValue(EditorText);
	const [res, setRes] = useState<any>(null);

	useEffect(() => {
		console.log('render');
	});
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
		setRes(eval(code));
	}

	return (
		<>
			<Stack spacing={0} h='100vh' bg='teal.500'>
				<Navbar />

				<SimpleGrid columns={2} h='full'>
					<GridItem>
						<Editor />
					</GridItem>

					<GridItem>
						<Tree />
						{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique ratione quisquam ipsum in culpa quis explicabo quidem tempora. Labore! */}
					</GridItem>
				</SimpleGrid>
			</Stack>
		</>
	);
}

export default App;
