import { selector } from 'recoil';
import EditorState from '../atoms/EditorState';

const EditorText = selector({
	key: 'EditorText',
	get: ({ get }) => {
		const { text } = get(EditorState);
		return text;
	}
});

export default EditorText;
