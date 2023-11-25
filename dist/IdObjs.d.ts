import { PlainAnyObj } from 'my-useful-type';
export type WithId<T extends PlainAnyObj> = T & {
    id: number;
};
export default class<I extends PlainAnyObj & {
    id?: number;
}> {
    constructor(initialValues?: I[]);
    values: WithId<I>[];
    cleanId(): import("./IdManager").default;
    private mapIdForAdd;
    adds(...items: I[]): void;
    unshift(...items: I[]): void;
    removes(...ids: number[]): void;
    find(id: number): WithId<I> | undefined;
}
