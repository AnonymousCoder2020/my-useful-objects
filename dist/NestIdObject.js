import { eachRecur } from 'next-ts-utility';
import { Init } from './';
import cleanIntId from './lib/cleanIntId';
class NestIdObject extends Init {
    constructor() {
        super();
        this.open = true;
    }
    toggleOpen() {
        this.open = !this.open;
    }
    get followers() {
        return eachRecur(this, node => node.children);
    }
    cleanIdOnTop() {
        const nodes = this.followers;
        this.idManager = cleanIntId(nodes, {
            getter: node => node.id,
            setter: (node, id) => (node.id = id),
        });
    }
    clearId() {
        const { root } = this;
        (root !== null && root !== void 0 ? root : this).cleanIdOnTop();
    }
    get root() {
        let parent = this.parent;
        let prev = this;
        while (parent) {
            prev = parent; //前の内容を保存
            parent = parent.parent;
        }
        return prev;
    }
    setChildren(callback) {
        var _a;
        const { children, root } = this;
        if (!root.idManager)
            root.cleanIdOnTop();
        const createCopy = () => { var _a; return (_a = children === null || children === void 0 ? void 0 : children.slice()) !== null && _a !== void 0 ? _a : []; };
        const newChildren = (_a = callback === null || callback === void 0 ? void 0 : callback(createCopy(), root.idManager)) !== null && _a !== void 0 ? _a : createCopy();
        newChildren.forEach(child => (child.parent = this));
        this.children = newChildren;
    }
}
export default NestIdObject;
