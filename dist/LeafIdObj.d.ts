import Init from './Init';
import type NestIdObj from './NestIdObj';
type IdObj = LeafIdObj | NestIdObj;
declare class LeafIdObj extends Init {
    name?: string;
    id?: number;
    boss?: NestIdObj;
    get d(): number;
    get root(): IdObj;
    isSubOf(bossOrNot: NestIdObj): boolean;
    del(): this;
    isValidId(): this is this & {
        id: number;
    };
}
export default LeafIdObj;
