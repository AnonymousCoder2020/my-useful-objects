import { Init, IntIdManager } from '.';
import { CleanMode } from './lib/cleanIntId';
type SetSonsCallback = (children: NestIdObj[], idManager: IntIdManager) => NestIdObj[];
declare class NestIdObj extends Init<NestIdObj> {
    cleanMode: CleanMode;
    name?: string;
    id?: number;
    open?: boolean;
    boss?: NestIdObj;
    sons?: NestIdObj[];
    idManager?: IntIdManager;
    constructor(cleanMode: CleanMode);
    toggleOpen(): void;
    get followers(): NestIdObj[];
    private cleanIdOnTop;
    cleanId(): void;
    get root(): NestIdObj;
    setSons(callback?: SetSonsCallback): void;
    get lastId(): number;
    addSons(...sons: NestIdObj[]): void;
    d(): number;
}
export default NestIdObj;
