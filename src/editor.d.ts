
interface EditorState {
    text: string,
    errors: EditorError[]
}
interface EditorError {
    message: string,
    column: number,
    row: number
}

type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;

