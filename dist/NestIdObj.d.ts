import { Init, IntIdManager } from '.';
import { CleanMode } from './lib/cleanIntId';
type AddSonsCallback = (sons: NestIdObj[], addSons: NestIdObj[]) => NestIdObj[];
declare class NestIdObj extends Init<NestIdObj> {
    cleanMode: CleanMode;
    name?: string;
    id?: number;
    open?: boolean;
    boss?: NestIdObj;
    sons?: NestIdObj[];
    idManager?: IntIdManager;
    constructor(cleanMode: CleanMode);
    get d(): number;
    get followers(): NestIdObj[];
    get root(): NestIdObj;
    toggleOpen(): this;
    private cleanIdOnTop;
    cleanId(): this;
    isSonOf(bossOrNot: NestIdObj): boolean;
    private opeSons;
    addSons(addSons: NestIdObj[], callback: AddSonsCallback): this;
    delSons(delSons: NestIdObj[]): this;
}
export default NestIdObj;
