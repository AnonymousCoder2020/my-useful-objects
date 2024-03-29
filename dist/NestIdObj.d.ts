import { Init, IntIdManager } from '.';
import { CleanMode } from './lib/cleanIntId';
type AddSonsCallback = (subs: NestIdObj[], addSubs: NestIdObj[]) => NestIdObj[];
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
    cleanId(): IntIdManager;
    isSubOf(bossOrNot: NestIdObj): boolean;
    private opeSubs;
    addSubs(addSubs: NestIdObj[], callback: AddSonsCallback): this;
    delSubs(delSubs: NestIdObj[]): this;
    insertSubs(idx: number, ...insertSubs: NestIdObj[]): this;
    pushSubs(...pushSubs: NestIdObj[]): this;
    del(): this;
}
export default NestIdObj;
