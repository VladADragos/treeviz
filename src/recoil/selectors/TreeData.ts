import { selector } from 'recoil';
import EditorState from '../atoms/EditorState';

const treeData = selector({
	key: 'TreeData',
	get: ({ get }) => {
		const { text } = get(EditorState);
		let jsonData = { name: 'error' };
		try {
			const json = JSON.parse(text);
			if (typeof json == 'object') {
				jsonData = json;
			}
		} catch {
			/* ingore */
		}
		return jsonData;
	}
});

export default treeData;
