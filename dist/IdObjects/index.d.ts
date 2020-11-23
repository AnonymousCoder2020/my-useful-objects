import { PlainAnyObject } from 'my-useful-type';
declare type WithId<T extends PlainAnyObject> = T & {
    id: number;
};
export default class<I extends PlainAnyObject & {
    id?: number;
}> {
    constructor(initialValues?: I[]);
    values: WithId<I>[];
    cleanId(): import("../IdManager").default;
    private mapIdForAdd;
    adds(...items: I[]): void;
    unshift(...items: I[]): void;
    removes(...ids: number[]): void;
    find(id: number): WithId<I> | undefined;
}
export {};
