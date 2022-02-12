import {
	useDisclosure,
	Box,
	Flex,
	Text,
	IconButton,
	Icon,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Stack,
	Button
} from '@chakra-ui/react';
import { MenuIcon } from '@heroicons/react/solid';
import React from 'react';
import { useRecoilState } from 'recoil';
import EditorState from '../recoil/atoms/EditorState';
import BST from '../trees/BST';
const Navbar = () => {
	const [editorState, setEditorState] = useRecoilState(EditorState);
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box bg='blue.700'>
			<Flex justify='space-between' align='center' px='3' py='1'>
				<>
					<IconButton
						tabIndex={1}
						variant='solid'
						colorScheme='whiteAlpha'
						bg='blue.700'
						aria-label='menu button'
						icon={<Icon as={MenuIcon} w='8' h='8' />}
						onClick={onOpen}
					/>
					<Drawer placement='left' isOpen={isOpen} onClose={onClose}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader borderBottom='1px' borderBottomColor='gray.200'>
								Tree Types
							</DrawerHeader>
							<DrawerBody>
								<Stack spacing='4'>
									<Button
										width='full'
										onClick={() => {
											setEditorState({
												...editorState,
												text: BST
											});
										}}
									>
										<Text>Trie</Text>
									</Button>
									<Button
										width='full'
										onClick={() => {
											setEditorState({
												...editorState,
												text: BST
											});
										}}
									>
										<Text>Kdtree</Text>
									</Button>
									<Button
										width='full'
										onClick={() => {
											setEditorState({
												...editorState,
												text: BST
											});
										}}
									>
										<Text>BST</Text>
									</Button>
								</Stack>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</>
				<Text fontSize='3xl' fontFamily='mono' fontWeight='semibold' color='gray.100'>
					TreeViz
				</Text>
			</Flex>
		</Box>
	);
};

export default Navbar;
