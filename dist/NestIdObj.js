import { max } from 'lodash-es';
import { eachRecur } from 'next-ts-utility';
import { Init } from '.';
import cleanIntId from './lib/cleanIntId';
class NestIdObj extends Init {
    cleanMode;
    name;
    id;
    open = true;
    boss;
    sons;
    idManager;
    constructor(cleanMode) {
        super();
        this.cleanMode = cleanMode;
    }
    toggleOpen() {
        this.open = !this.open;
    }
    get followers() {
        return eachRecur(this, node => node.sons);
    }
    cleanIdOnTop() {
        this.idManager = cleanIntId(this.cleanMode, this.followers, {
            get: node => node.id,
            set: (node, id) => (node.id = id)
        });
    }
    cleanId() {
        ;
        (this.root ?? this).cleanIdOnTop();
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
        const { sons, root } = this;
        if (!root.idManager)
            root.cleanIdOnTop();
        const createCopy = () => sons?.slice() ?? [];
        const newSons = callback?.(createCopy(), root.idManager) ?? createCopy();
        newSons.forEach(child => (child.boss = this));
        this.sons = newSons;
    }
    get lastId() {
        const dumpedIds = this.idManager?.dumps;
        const treeIds = this.root.followers.map(obj => obj.id).filter(id => typeof id == 'number');
        const maxTreeId = max(treeIds);
        if (!maxTreeId)
            return 0;
        return dumpedIds?.includes(maxTreeId) ? maxTreeId + 1 : maxTreeId;
    }
    addSons(...sons) {
        const lastId = this.lastId;
        if (!lastId)
            return;
        sons.map((son, i) => (son.id = lastId + i));
        this.sons = (this.sons ?? []).concat(sons);
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
