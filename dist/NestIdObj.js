import { max } from 'lodash-es';
import { eachRecur } from 'next-ts-utility';
import { Init } from '.';
import cleanIntId from './lib/cleanIntId';
class NestIdObj extends Init {
    constructor() {
        super();
        this.open = true;
    }
    toggleOpen() {
        this.open = !this.open;
    }
    get followers() {
        return eachRecur(this, node => node.sons);
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
        let parent = this.boss;
        let prev = this;
        while (parent) {
            prev = parent; //前の内容を保存
            parent = parent.boss;
        }
        return prev;
    }
    setSons(callback) {
        var _a;
        const { sons, root } = this;
        if (!root.idManager)
            root.cleanIdOnTop();
        const createCopy = () => { var _a; return (_a = sons === null || sons === void 0 ? void 0 : sons.slice()) !== null && _a !== void 0 ? _a : []; };
        const newSons = (_a = callback === null || callback === void 0 ? void 0 : callback(createCopy(), root.idManager)) !== null && _a !== void 0 ? _a : createCopy();
        newSons.forEach(child => (child.boss = this));
        this.sons = newSons;
    }
    get lastId() {
        var _a;
        const dumpedIds = (_a = this.idManager) === null || _a === void 0 ? void 0 : _a.dumpedIds;
        const treeIds = this.root.followers.map(obj => obj.id).filter(id => typeof id == 'number');
        const maxTreeId = max(treeIds);
        if (!maxTreeId)
            return 0;
        return (dumpedIds === null || dumpedIds === void 0 ? void 0 : dumpedIds.includes(maxTreeId)) ? maxTreeId + 1 : maxTreeId;
    }
    addSons(...sons) {
        var _a;
        const lastId = this.lastId;
        if (!lastId)
            return;
        sons.map((son, i) => (son.id = lastId + i));
        this.sons = ((_a = this.sons) !== null && _a !== void 0 ? _a : []).concat(sons);
    }
    d() {
        let boss = this.boss;
        let d = 0;
        while (boss) {
            d++;
            boss = boss.boss;
        }
        return d;
    }
}
export default NestIdObj;
