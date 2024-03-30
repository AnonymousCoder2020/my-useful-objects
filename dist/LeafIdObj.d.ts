import { ClassPropsPartial } from 'next-type-utility';
import type NestIdObj from './NestIdObj';
type IdObj = LeafIdObj | NestIdObj;
declare class LeafIdObj {
    constructor(init: ClassPropsPartial<LeafIdObj>);
    name?: string;
    id?: number;
    boss?: NestIdObj;
    get d(): number;
    get root(): IdObj;
    isSubOf(bossOrNot: NestIdObj): boolean;
    del(): this;
}
export default LeafIdObj;
