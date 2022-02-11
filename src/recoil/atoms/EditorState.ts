import { atom } from 'recoil';

const initalState = {
	name: 'root',
	children: [{ name: 'test1' }, { name: 'test2' }]
};
const localStoragePrefix = 'TREEVIZ-';
export const localStorageKey = localStoragePrefix + 'editorText';
const localStorageTreeData = window.localStorage.getItem(localStorageKey);
const atomDefault = localStorageTreeData
	? localStorageTreeData
	: JSON.stringify(initalState);

const EditorState = atom<EditorState>({
	key: 'EditorState',
	default: { text: atomDefault, errors: [] }
});

export default EditorState;
