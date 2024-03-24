declare class IntIdManager {
    nextId: number;
    dumps: number[];
    constructor(nextId?: number, dumps?: number[]);
    use(): number;
    reuse(): number;
    dump(id: number): void;
}
export default IntIdManager;
