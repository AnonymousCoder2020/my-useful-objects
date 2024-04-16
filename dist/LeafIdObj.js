import Init from './Init';
class LeafIdObj extends Init {
    name;
    id;
    boss;
    get d() {
        let boss = this.boss;
        let d = 0;
        while (boss) {
            d++;
            boss = boss.boss;
        }
        return d;
    }
    get root() {
        let boss = this;
        while (boss?.boss)
            boss = boss.boss;
        return boss;
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
    del() {
        this.boss?.delSubs([this]);
        return this;
    }
}
export default LeafIdObj;
