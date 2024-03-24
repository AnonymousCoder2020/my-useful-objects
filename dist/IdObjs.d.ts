import { PlainAnyObj } from 'next-type-utility';
import { CleanMode } from './lib/cleanIntId';
export type WithId<T extends PlainAnyObj> = T & {
    id: number;
};
export default class<I extends PlainAnyObj & {
    id?: number;
}> {
    cleanMode: CleanMode;
    constructor(cleanMode: CleanMode, initialValues?: I[]);
    values: WithId<I>[];
    cleanId(): import("~/IntIdManager").default;
    private mapIdForAdd;
    adds(...items: I[]): void;
    unshift(...items: I[]): void;
    removes(...ids: number[]): void;
    find(id: number): WithId<I> | undefined;
}
