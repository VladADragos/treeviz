import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowsExpandIcon, ChevronDownIcon } from '@heroicons/react/solid';
import MonacoEditor from '@monaco-editor/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import EditorState, { localStorageKey } from '../recoil/atoms/EditorState';

interface ErrorsProps {
	errors: EditorError[];
}

interface BarProps {
	position: Position;
}

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
	return (
		<div className=' bg-neutral-800 bottompane'>
			{errors.map((error, index) => {
				return (
					<p className='text-slate-50' key={index}>
						ERROR: {error.message} at row: {error.position.row},
						column: {error.position.column}
					</p>
				);
			})}
		</div>
	);
};

const Bar: React.FC<BarProps> = ({ position }) => {
	return (
		<Box bg='gray.700'>
			<Text textAlign='right' mr='2' color='gray.400'>
				row: {position.row}, column: {position.column}
			</Text>
		</Box>
	);
};

const Editor: React.FC = () => {
	const [position, setPosition] = useState<Position>({ row: 0, column: 0 });
	const [editorState, setEditorState] = useRecoilState(EditorState);
	const [showErrors, setShowErrors] = useState(true);
	function handleErrors(error: any) {
		if (error.length > 0) {
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
		} else {
			setEditorState({ ...editorState, errors: [] });
		}
	}

	function handleOnChange(text: string) {
		setEditorState({ ...editorState, text });
		localStorage.setItem(localStorageKey, text);
	}

	return (
		<Flex flexDir='column' height='full' bg='gray.800'>
			<Flex flexDir='column' h='full' alignContent='baseline'>
				<Box h='full' flex='2'>
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
						height={'100%'}
						width={'100%'}
						defaultLanguage='json'
						language='json'
						defaultValue=''
						theme='vs-dark'
						value={editorState.text}
						onChange={s => {
							if (s) handleOnChange(s);
						}}
						onValidate={e => {
							handleErrors(e);
						}}
					/>
				</Box>
				<Box flex='1'>
					<Bar position={position} />
					{showErrors && <Errors errors={editorState.errors} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default Editor;
