import { IdManager, Init } from '.';
type SetSonsCallback = (children: NestIdObj[], idManager: IdManager) => NestIdObj[];
declare class NestIdObj extends Init<NestIdObj> {
    name?: string;
    id?: number;
    open?: boolean;
    boss?: NestIdObj;
    sons?: NestIdObj[];
    idManager?: IdManager;
    constructor();
    toggleOpen(): void;
    get followers(): NestIdObj[];
    private cleanIdOnTop;
    clearId(): void;
    get root(): NestIdObj;
    setSons(callback?: SetSonsCallback): void;
    get lastId(): number;
    addSons(...sons: NestIdObj[]): void;
    d(): number;
}
export default NestIdObj;
