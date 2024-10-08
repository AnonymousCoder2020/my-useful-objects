import { eachRecur } from 'next-ts-utility';
import { IntIdManager } from '.';
import LeafIdObj from './LeafIdObj';
import cleanIntId from './lib/cleanIntId';
class NestIdObj extends LeafIdObj {
    cleanMode;
    open = true;
    subs;
    idManager;
    constructor(cleanMode) {
        super();
        this.cleanMode = cleanMode;
    }
    teachBoss() {
        eachRecur(this, node => {
            if (node instanceof NestIdObj) {
                node.subs?.forEach(sub => (sub.boss = node));
                return node.subs;
            }
            else {
                return [];
            }
        });
        return this;
    }
    getSubTree(includeRoot) {
        return eachRecur(this, node => (node instanceof NestIdObj ? node.subs : []), { includeRoot });
    }
    findNode(id) {
        return this.getSubTree().find(node => node.isValidId() && id === node.id);
    }
    findNodes(...ids) {
        return this.getSubTree().filter(node => node.isValidId() && ids.includes(node.id));
    }
    get root() {
        let boss = this;
        while (boss?.boss)
            boss = boss.boss;
        return boss;
    }
    toggleOpen() {
        this.open = !this.open;
        return this;
    }
    cleanId() {
        return this.root.cleanIdOnTop();
    }
    cleanIdOnTop() {
        this.idManager = cleanIntId(this.cleanMode, this.getSubTree(), {
            get: node => node.id,
            set: (node, id) => (node.id = id),
        });
        return this.idManager;
    }
    opeSubs(callback) {
        const { subs, root } = this;
        if (!root.idManager)
            root.cleanIdOnTop();
        const createCopy = () => subs?.slice() ?? [];
        const newSubs = callback(createCopy(), root.idManager) ?? createCopy();
        newSubs.forEach(child => (child.boss = this));
        this.subs = newSubs;
        return this;
    }
    addSubs(addSubs, callback) {
        this.opeSubs((subs, idManager) => {
            for (const addSub of addSubs) {
                // 親が自分の子になることを防ぐ
                if (addSub instanceof NestIdObj && this.isSubOf(addSub))
                    continue;
                addSub.id = idManager.use();
                addSub.boss = this;
            }
            return callback(subs, addSubs);
        });
        return this;
    }
    delSubs(delSubs) {
        this.opeSubs((subs, idManager) => {
            for (const delSub of delSubs) {
                // 自分の子以外を削除してしまうのを防ぐ
                if (!subs.includes(delSub))
                    continue;
                if (IntIdManager.isValidId(delSub.id))
                    idManager.dump(delSub.id);
                delSub.boss = undefined;
            }
            return subs.filter(son => !delSubs.includes(son));
        });
        return this;
    }
    insertSubs(idx, ...insertSubs) {
        this.addSubs(insertSubs, (subs, addSubs) => subs.toSpliced(idx, 0, ...addSubs));
        return this;
    }
    pushSubs(...pushSubs) {
        this.addSubs(pushSubs, (subs, addSubs) => subs.toSpliced(subs.length, 0, ...addSubs));
        return this;
    }
}
export default NestIdObj;
