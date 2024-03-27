import { eachRecur } from 'next-ts-utility';
import { Init, IntIdManager } from '.';
import cleanIntId from './lib/cleanIntId';
class NestIdObj extends Init {
    cleanMode;
    name;
    id;
    open = true;
    boss;
    subs;
    idManager;
    constructor(cleanMode) {
        super();
        this.cleanMode = cleanMode;
    }
    get d() {
        let boss = this.boss;
        let d = 0;
        while (boss) {
            d++;
            boss = boss.boss;
        }
        return d;
    }
    get followers() {
        return eachRecur(this, node => node.subs);
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
    cleanIdOnTop() {
        this.idManager = cleanIntId(this.cleanMode, this.followers, {
            get: node => node.id,
            set: (node, id) => (node.id = id)
        });
        return this;
    }
    cleanId() {
        ;
        (this.root ?? this).cleanIdOnTop();
        return this;
    }
    isSubOf(bossOrNot) {
        let boss = this.boss;
        while (boss) {
            if (boss == bossOrNot)
                return true;
            boss = boss.boss;
        }
        return false;
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
                if (IntIdManager.isValidId(delSub.id))
                    idManager.dump(delSub.id);
                delSub.boss = undefined;
            }
            return subs.filter(son => !delSubs.includes(son));
        });
        return this;
    }
    del() {
        this.boss?.delSubs([this]);
        return this;
    }
}
export default NestIdObj;
