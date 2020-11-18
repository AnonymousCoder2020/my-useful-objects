interface IdObject {
    id: number;
    [key: string]: any;
}
export default class<I extends IdObject> {
    constructor(initialValues?: I[]);
    values: I[];
    cleanId(): void;
    adds(...items: I[]): void;
    removes(...ids: number[]): void;
    find(id: number): I | undefined;
}
export {};
