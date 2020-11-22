import { PlainAnyObject } from 'my-useful-type';
declare type Withid<T extends PlainAnyObject> = T & {
    id: number;
};
export default class<I extends PlainAnyObject & {
    id?: number;
}> {
    constructor(initialValues?: I[]);
    values: Withid<I>[];
    cleanId(): void;
    private mapIdForAdd;
    adds(...items: I[]): void;
    unshift(...items: I[]): void;
    removes(...ids: number[]): void;
    find(id: number): Withid<I> | undefined;
}
export {};
