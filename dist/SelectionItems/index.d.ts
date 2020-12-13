import { ClassPropsPartial } from 'my-useful-type';
export declare type Id = string | number;
declare type GetIdDef<T, I extends Id> = (item: T) => I;
export default class SelectionItems<T, I extends Id> {
    items: T[];
    getIdDef: GetIdDef<T, I>;
    select: Set<I>;
    range: Set<I>;
    pinId?: I;
    constructor(items: T[], getIdDef: GetIdDef<T, I>, option?: ClassPropsPartial<SelectionItems<T, I>>);
    get totalSelect(): I[];
    private getId;
    private getIdx;
    toggle(idx: number): void;
    toggleId(id: I): void;
    takeOverSelect(): void;
    cover(startIdx: number, endIdx: number): void;
    coverBy(endIdx: number): void;
    isInclude(id: I): boolean;
    clean(): void;
}
export {};
