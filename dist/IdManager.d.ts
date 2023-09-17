declare class NumberIdManager {
    currentId: number;
    dumpedIds: number[];
    constructor(currentId: number, dumpedIds: number[]);
    use(): number;
    dump(id: number): void;
}
export default NumberIdManager;
