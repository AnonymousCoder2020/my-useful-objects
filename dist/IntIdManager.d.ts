declare class IntIdManager {
    nextId: number;
    dumps: number[];
    static isValidId(id: unknown): id is number;
    constructor(nextId?: number, dumps?: number[]);
    use(): number;
    reuse(): number;
    dump(id: number): this;
}
export default IntIdManager;
