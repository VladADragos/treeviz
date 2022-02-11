interface Position {
	row: number;
	column: number;
}

interface EditorError {
	message: string;
	position: Position;
}
interface EditorState {
	text: string;
	errors: EditorError[];
}

type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;
