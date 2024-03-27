import { Init, IntIdManager } from '.';
import { CleanMode } from './lib/cleanIntId';
type AddSonsCallback = (subs: NestIdObj[], addSons: NestIdObj[]) => NestIdObj[];
declare class NestIdObj extends Init<NestIdObj> {
    cleanMode: CleanMode;
    name?: string;
    id?: number;
    open?: boolean;
    boss?: NestIdObj;
    subs?: NestIdObj[];
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
    del(): this;
}
export default NestIdObj;
