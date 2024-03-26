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
    isSonOf(bossOrNot) {
        let boss = this.boss;
        while (boss) {
            if (boss == bossOrNot)
                return true;
            boss = boss.boss;
        }
        return false;
    }
    opeSons(callback) {
        const { subs, root } = this;
        if (!root.idManager)
            root.cleanIdOnTop();
        const createCopy = () => subs?.slice() ?? [];
        const newSons = callback(createCopy(), root.idManager) ?? createCopy();
        newSons.forEach(child => (child.boss = this));
        this.subs = newSons;
        return this;
    }
    addSons(addSons, callback) {
        this.opeSons((subs, idManager) => {
            for (const addSon of addSons) {
                addSon.id = idManager.use();
                addSon.boss = this;
            }
            return callback(subs, addSons);
        });
        return this;
    }
    delSons(delSons) {
        this.opeSons((subs, idManager) => {
            for (const delSon of delSons) {
                if (IntIdManager.isValidId(delSon.id))
                    idManager.dump(delSon.id);
                delSon.boss = undefined;
            }
            return subs.filter(son => !delSons.includes(son));
        });
        return this;
    }
}
export default NestIdObj;
