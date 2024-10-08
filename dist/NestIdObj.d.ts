import { IntIdManager } from '.';
import LeafIdObj from './LeafIdObj';
import { CleanMode } from './lib/cleanIntId';
type AddSonsCallback = (subs: IdObj[], addSubs: IdObj[]) => IdObj[];
export type IdObj = LeafIdObj | NestIdObj;
declare class NestIdObj extends LeafIdObj {
    cleanMode: CleanMode;
    open?: boolean;
    subs?: (NestIdObj | LeafIdObj)[];
    idManager?: IntIdManager;
    constructor(cleanMode: CleanMode);
    teachBoss(): this;
    getSubTree(includeRoot?: false): IdObj[];
    findNode(id: number): IdObj | undefined;
    findNodes(...ids: number[]): IdObj[];
    get root(): NestIdObj;
    toggleOpen(): this;
    cleanId(): IntIdManager;
    private cleanIdOnTop;
    private opeSubs;
    addSubs(addSubs: IdObj[], callback: AddSonsCallback): this;
    delSubs(delSubs: IdObj[]): this;
    insertSubs(idx: number, ...insertSubs: IdObj[]): this;
    pushSubs(...pushSubs: IdObj[]): this;
}
export default NestIdObj;
