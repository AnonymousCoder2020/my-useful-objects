import { IdManager, Init } from './';
declare type SetChildrenCallback = (children: NestIdObject[], idManager: IdManager) => NestIdObject[];
declare class NestIdObject extends Init<NestIdObject> {
    name?: string;
    id?: number;
    open?: boolean;
    parent?: NestIdObject;
    children?: NestIdObject[];
    idManager?: IdManager;
    constructor();
    toggleOpen(): void;
    get followers(): NestIdObject[];
    private cleanIdOnTop;
    clearId(): void;
    get root(): NestIdObject;
    setChildren(callback?: SetChildrenCallback): void;
}
export default NestIdObject;
