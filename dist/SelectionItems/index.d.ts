import { ClassPropsPartial } from 'my-useful-type';
import Init from '../Init';
export declare type Id = string | number;
declare type GetIdDef<T, I extends Id> = (item: T) => I;
export default class SelectionItems<T, I extends Id> extends Init<SelectionItems<T, I>> {
    items: T[];
    getIdDef: GetIdDef<T, I>;
    select: Set<I>;
    range: Set<I>;
    pinId?: I;
    constructor(items: T[], getIdDef: GetIdDef<T, I>, option?: ClassPropsPartial<SelectionItems<T, I>>);
    get totalSelect(): I[];
    getId(idx: number): I | undefined;
    getIdx(id: I): number;
    toggle(idx: number): void;
    toggleId(id: I): void;
    takeOverSelect(): void;
    cover(startIdx: number, endIdx: number): void;
    coverBy(endIdx: number): void;
    isInclude(id: I): boolean;
    clean(): void;
}
export {};
