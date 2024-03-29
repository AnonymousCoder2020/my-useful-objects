import { ClassPropsPartial } from 'next-type-utility';
import NestIdObj from './NestIdObj';
type IdObj = LeafIdObj | NestIdObj;
declare class LeafIdObj {
    constructor(init: ClassPropsPartial<LeafIdObj>);
    name?: string;
    id?: number;
    boss?: NestIdObj;
    get d(): number;
    get root(): IdObj;
    isSubOf(bossOrNot: NestIdObj): boolean;
    cleanId(): import("~/IntIdManager").default | undefined;
    del(): this;
}
export default LeafIdObj;
