import { Box, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { ExclamationIcon } from '@heroicons/react/solid';
import MonacoEditor from '@monaco-editor/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import EditorState, { localStorageKey } from '../recoil/atoms/EditorState';
interface ErrorsProps {
	errors: EditorError[];
}

interface BarProps {
	position: Position;
	numErrors: number;
}

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
	return (
		<Box>
			{errors.map((error, index) => {
				return (
					<Flex key={index} alignItems='center' ml='2' mb='1'>
						<Icon as={ExclamationIcon} color='red.900' fontSize='medium' />
						<Text fontSize='small' fontWeight='medium' color='white' ml='1'>
							{error.message} [{error.position.row},{error.position.column}]
						</Text>
					</Flex>
				);
			})}
		</Box>
	);
};

const Bar: React.FC<BarProps> = ({ position, numErrors }) => {
	return (
		<Flex
			bg='gray.900'
			borderBottom='2px'
			borderColor='gray.900'
			justifyContent='space-between'
			px='1'
		>
			<Text color='gray.400'>Errors: {numErrors}</Text>
			<Text color='gray.400'>
				row: {position.row}, column: {position.column}
			</Text>
		</Flex>
	);
};
const Editor: React.FC = () => {
	const [position, setPosition] = useState<Position>({ row: 0, column: 0 });
	const [editorState, setEditorState] = useRecoilState(EditorState);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleErrors(error: any) {
		setEditorState({
			...editorState,
			errors: error.map(
				({
					message,
					endColumn,
					endLineNumber
				}: {
					message: string;
					endColumn: number;
					endLineNumber: number;
				}) => {
					return {
						position: { column: endColumn, row: endLineNumber },
						message: message
					};
				}
			)
		});
	}

	function handleOnChange(text: string) {
		setEditorState({ ...editorState, text });
		localStorage.setItem(localStorageKey, text);
	}
	return (
		<Grid bg='gray.800' h='full' gridTemplateRows='repeat(4,1fr)'>
			<GridItem rowSpan={3}>
				{/* <Text fontSize='4xl' color='white'>
					Editor
				</Text> */}
				<Flex h='full' flexDir='column'>
					<MonacoEditor
						onMount={editor => {
							editor.onDidChangeCursorPosition(e =>
								setPosition({
									row: e.position.lineNumber,
									column: e.position.column
								})
							);
						}}
						options={{
							tabSize: 4,
							tabCompletion: 'on',
							columnSelection: true,
							minimap: { enabled: false },
							suggestSelection: 'recentlyUsedByPrefix'
						}}
						loading={<Box>loading...</Box>}
						defaultLanguage='json'
						language='json'
						defaultValue=''
						theme='vs-dark'
						// spinner={}
						value={editorState.text}
						onChange={s => {
							if (s) handleOnChange(s);
						}}
						onValidate={e => {
							handleErrors(e);
						}}
					/>
					<Bar position={position} numErrors={editorState.errors.length} />
				</Flex>
			</GridItem>

			<GridItem
				// flex={1}
				overflow='hidden'
				bg='gray.700'
				overflowY='scroll'
			>
				<Errors errors={editorState.errors} />
			</GridItem>
		</Grid>
	);
};
export default Editor;
